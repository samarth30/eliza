import {
    composeContext,
    elizaLogger,
    generateMessageResponse,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    messageCompletionFooter,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";

const BASE_URL = "https://api.0xscope.com/v2";

const messageHandlerTemplate =
    // {{goals}}
    `# Action Examples
{{actionExamples}}
(Action examples are for reference only. Do not use the information from them in your response.)

# report : {{detailedPrompt}}

# Knowledge
{{knowledge}}

# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}

Examples of {{agentName}}'s dialog and actions:
{{characterMessageExamples}}

{{providers}}

{{attachments}}

{{actions}}

# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.

{{messageDirections}}

{{recentMessages}}

# Task: Generate a post/reply of the above report in the voice, style and perspective of {{agentName}} (@{{twitterUserName}}) while using the thread of tweets as additional context:

let's generate message for normal chat text box with the above report.
`;

interface AnalysisResult {
    identityData?: any;
    riskScore?: any;
    socialData?: any;
    ensData?: any;
    transactionsData?: any;
    tokenTransfersData?: any;
    relatedAddresses?: any;
}

interface RiskAnalysis {
    level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    factors: string[];
    recommendations: string[];
}

async function scopeApiCall(
    endpoint: string,
    secretKey: string,
    params?: RequestInit
) {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            "API-KEY": secretKey,
            accept: "*/*",
            "Content-Type": "application/json",
        },
        ...params,
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * High-level function to fetch analysis data for an address.
 */
async function analyzeAddress(
    chain: string,
    address: string,
    secretKey: string
): Promise<AnalysisResult> {
    elizaLogger.log(`Starting analysis for address: ${address}`);

    try {
        // Adjust endpoints as needed to match your actual API paths
        const [
            identityData,
            riskScore,
            socialData,
            ensData,
            transactionsData,
            tokenTransfersData,
            relatedAddresses,
        ] = await Promise.all([
            scopeApiCall(
                `/address/identityTag?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/kye/entityRisk?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/address/socialMedia?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/address/ENS?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/address/transactions?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/address/tokenTransfers?address=${address}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/entity/relatedAddress?address=${address}&chain=${chain}`,
                secretKey
            ),
        ]);

        return {
            identityData,
            riskScore,
            socialData,
            ensData,
            transactionsData,
            tokenTransfersData,
            relatedAddresses,
        };
    } catch (error) {
        elizaLogger.error(`Analysis failed for address ${address}:`, error);
        throw error;
    }
}

/**
 * Example risk factor analysis logic.
 * Customize with your own thresholds and checks.
 */
function analyzeRiskFactors(analysisResult: AnalysisResult): RiskAnalysis {
    const riskFactors: string[] = [];
    const recommendations: string[] = [];
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";

    if (analysisResult.riskScore?.score > 80) {
        riskLevel = "CRITICAL";
        riskFactors.push("Extremely high risk score");
        recommendations.push("Immediate investigation recommended");
    }

    return {
        level: riskLevel,
        factors: riskFactors,
        recommendations,
    };
}

/**
 * Builds a comprehensive text report of the address analysis.
 * You can feed this to an LLM or display it directly.
 */
function generateDetailedPrompt(
    chain: string,
    address: string,
    analysisResult: AnalysisResult
): string {
    const riskAnalysis = analyzeRiskFactors(analysisResult);
    console.log(riskAnalysis, "risk analyses");

    return `
🔍 Address Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━
🔗 Network: ${chain.charAt(0).toUpperCase() + chain.slice(1)}

${getRiskLevelEmoji(riskAnalysis.level)} Risk Level: ${riskAnalysis.level}
${riskAnalysis.factors.length ? "⚠️ Warning: " + riskAnalysis.factors[0] : "✅ No immediate risks detected"}

👤 Identity Overview
------------------
• Address: ${address.slice(0, 6)}...${address.slice(-4)}
• ENS: ${formatEnsData(analysisResult.ensData)}
${formatIdentityData(analysisResult.identityData)}

💰 Transaction Activity
--------------------
${formatTransactionData(analysisResult.transactionsData)}

🔄 Token Transfers
---------------
${formatTokenTransfers(analysisResult.tokenTransfersData)}

🌐 Social Presence
---------------
${formatSocialData(analysisResult.socialData)}

🤝 Related Addresses
----------------
${formatRelatedAddresses(analysisResult.relatedAddresses)}

⚠️ Risk Assessment
---------------
${formatRiskSection(riskAnalysis)}

Need help understanding this report? Just ask! 🤝`;
}

// New helper functions for formatting
function formatEnsData(ensData: any): string {
    if (!ensData?.data) return "No ENS data";
    // Add your ENS formatting logic
    return ensData.data || "No ENS name";
}

function formatIdentityData(identityData: any): string {
    if (!identityData?.data) return "• No verified identities found";

    return `• Known Identities: ${identityData.length}
${identityData?.data?.map((id: any) => `• type : ${id.type} , tag :  ${id.tag} , address : ${id.address}`).join("\n")}`;
}

function formatTransactionData(txData: any): string {
    if (!txData?.data?.rows) return "No transaction data available";

    return `• Total Transactions: ${txData?.data?.total}`;
}

function formatTokenTransfers(transfers: any): string {
    if (!transfers?.data?.rows) return "No token transfer data available";

    return `• Recent Token Activity:
${transfers?.data?.rows
    .slice(0, 10)
    .map(
        (transfer: any) =>
            `token_address : ${transfer.token_address} , token_name : ${transfer.token_name} , token_symbol : ${transfer.token_symbol} , token_valueUSD : ${transfer.token_valueUSD}`
    )
    .join("\n")}`;
}

function formatSocialData(socialData: any): string {
    if (!socialData?.data) return "No social presence detected";

    return `• Social Connections:
${socialData?.data
    .map((socialMediaData: any) => {
        return `address : ${socialMediaData.address} , twitter : ${socialMediaData.twitter} , debankAccount : ${socialMediaData.debankAccount} , github : ${socialMediaData.github} , isMirrorAuthority : ${socialMediaData.isMirrorAuthority}`;
    })
    .join("\n")}`;
}

function formatRelatedAddresses(related: any): string {
    if (!related?.data) return "No related addresses found";

    let output = "";
    if (related?.data?.length > 0) {
        output += `\nRelated Addresses (Top 10 by certainty):\n`;
        const sortedAddresses = [...related?.data]
            .sort((a, b) => b.certainty - a.certainty)
            .slice(0, 10);

        for (const addr of sortedAddresses) {
            output += ` - ${addr.address}\n`;
            output += `   Certainty: ${addr.certainty}%\n`;
            if (addr.description?.length > 0) {
                output += `   Relationship: ${addr.description.join(", ")}\n`;
            }
        }
    }
    return output;
}

function formatRiskSection(riskAnalysis: RiskAnalysis): string {
    if (!riskAnalysis.factors.length && !riskAnalysis.recommendations.length) {
        return "✨ This address appears to have no significant risk factors.";
    }

    let riskSection = "";

    if (riskAnalysis.factors.length) {
        riskSection +=
            "🚩 Risk Factors:\n" +
            riskAnalysis.factors.map((f) => `• ${f}`).join("\n") +
            "\n\n";
    }

    if (riskAnalysis.recommendations.length) {
        riskSection +=
            "💡 Recommendations:\n" +
            riskAnalysis.recommendations.map((r) => `• ${r}`).join("\n");
    }

    return riskSection;
}

function getRiskLevelEmoji(level: string): string {
    switch (level) {
        case "LOW":
            return "🟢";
        case "MEDIUM":
            return "🟡";
        case "HIGH":
            return "🟠";
        case "CRITICAL":
            return "🔴";
        default:
            return "⚪";
    }
}

//
// 3. ACTION DEFINITION
// -----------------------------------

export const addressAnalysisAction: Action = {
    name: "ADDRESS_ANALYSIS",
    similes: [
        "ANALYZE_WALLET",
        "CHECK_ADDRESS",
        "INVESTIGATE_WALLET",
        "WALLET_ANALYSIS",
        "ADDRESS_INVESTIGATION",
    ],
    validate: async (runtime: IAgentRuntime): Promise<boolean> => {
        const secretKey =
            runtime.getSetting("OXSCOPE_API_KEY") ??
            process.env.OXSCOPE_API_KEY;
        return Boolean(secretKey);
    },
    description:
        "Performs comprehensive blockchain address analysis using 0xScope API",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        _state: State,
        _options: any,
        callback: HandlerCallback
    ): Promise<any> => {
        try {
            const secretKey =
                runtime.getSetting("OXSCOPE_API_KEY") ??
                process.env.OXSCOPE_API_KEY;
            if (!secretKey) {
                throw new Error("0xScope API key not configured");
            }

            // Naive approach to extract an Ethereum address from user input
            const address =
                message.content.text.match(/0x[a-fA-F0-9]{40}/)?.[0];
            if (!address) {
                throw new Error("No valid Ethereum address found in message");
            }

            // You could also parse a "chain" from the message or default to "ethereum"
            const chainMatch = message.content.text.match(/chain=(\w+)/i);
            const chain = chainMatch ? chainMatch[1].toLowerCase() : "ethereum";

            // Initialize or update state
            if (!_state) {
                _state = (await runtime.composeState(message)) as State;
            } else {
                _state = await runtime.updateRecentMessageState(_state);
            }

            // 1) Perform the analysis
            const analysisResult = await analyzeAddress(
                chain,
                address,
                secretKey
            );

            // 2) Build a comprehensive prompt-like report
            const detailedPrompt = generateDetailedPrompt(
                chain,
                address,
                analysisResult
            );

            const context = composeContext({
                state: {
                    ..._state,
                    detailedPrompt,
                },
                template: messageHandlerTemplate,
            });

            const response = await generateText({
                runtime: runtime,
                context: context,
                modelClass: ModelClass.SMALL,
            });

            // Return or display the final result
            await callback({
                text: response,
            });
            return {
                raw: analysisResult,
                formatted: detailedPrompt,
            };
        } catch (error) {
            elizaLogger.error("Address analysis failed:", error);
            throw new Error(`Address analysis failed: ${error.message}`);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Analyze this address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                    action: "ADDRESS_ANALYSIS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here's the analysis report for the address...",
                    action: "CONTINUE",
                },
            },
        ],
    ],
};
