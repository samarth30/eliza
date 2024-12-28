import {
    composeContext,
    elizaLogger,
    generateText,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@elizaos/core";
import { messageHandlerTemplate } from "../templates/securityAnalysisTemplate";

const BASE_URL = "https://api.0xscope.com/v2";

/**
 * Data shape returned by the token analysis process
 */
interface TokenAnalysisResult {
    tokenDetail?: any;
    holdersCount?: any;
    tokenTransfers?: any;
    topHolders?: any;
    cexDeposit?: any;
    cexWithdraw?: any;
    cexHolding?: any;
}

interface TokenRiskAnalysis {
    level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    factors: string[];
    recommendations: string[];
}

/**
 * A simple wrapper to call 0xScope API endpoints.
 */
async function scopeApiCall(
    endpoint: string,
    secretKey: string,
    params?: RequestInit
) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
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
 * Fetch token-focused data from 0xScope's token endpoints in parallel
 */
async function analyzeToken(
    chain: string,
    tokenAddress: string,
    secretKey: string
): Promise<TokenAnalysisResult> {
    elizaLogger.log(
        `Starting token-focused analysis for [${chain}] ${tokenAddress}`
    );

    try {
        const [
            tokenDetail,
            holdersCount,
            tokenTransfers,
            topHolders,
            cexDeposit,
            cexWithdraw,
            cexHolding,
        ] = await Promise.all([
            scopeApiCall(
                `/token/detail?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/token/holdersCount?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/token/transfers?token_address=${tokenAddress}&chain=${chain}&limit=10&page=1`,
                secretKey
            ),
            scopeApiCall(
                `/token/topHolders?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/token/cexDeposit?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/token/cexWithdraw?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
            scopeApiCall(
                `/token/cexHolding?token_address=${tokenAddress}&chain=${chain}`,
                secretKey
            ),
        ]);

        return {
            tokenDetail,
            holdersCount,
            tokenTransfers,
            topHolders,
            cexDeposit,
            cexWithdraw,
            cexHolding,
        };
    } catch (error) {
        elizaLogger.error(
            `Token analysis failed for [${chain}] ${tokenAddress}:`,
            error
        );
        throw error;
    }
}

/**
 * Perform a simple risk evaluation on the token data
 */
function analyzeTokenRisk(
    analysisResult: TokenAnalysisResult
): TokenRiskAnalysis {
    const riskFactors: string[] = [];
    const recommendations: string[] = [];
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";

    // Placeholder logic - you can expand based on your real criteria
    if (analysisResult.holdersCount?.data?.data) {
        const count = analysisResult.holdersCount.data.data as number;
        if (count < 10) {
            riskLevel = "HIGH";
            riskFactors.push(
                "Very low number of holders - possible scam or new token."
            );
            recommendations.push(
                "Verify token origin, contract code, and check for rug pull patterns."
            );
        }
    }

    if (analysisResult.topHolders?.data?.data?.length) {
        const topHolders = analysisResult.topHolders.data.data;
        // If the #1 holder has a large percentage, that can be a red flag
        if (topHolders[0]?.percentage && topHolders[0].percentage > 50) {
            riskLevel = "CRITICAL";
            riskFactors.push("Top holder owns over 50% of total supply.");
            recommendations.push(
                "Extreme caution: possible rug pull or centralized control."
            );
        }
    }

    // Add more logic/rules as needed...
    return {
        level: riskLevel,
        factors: riskFactors,
        recommendations,
    };
}

/**
 * Summaries to transform raw API data into human-readable text
 */
function summarizeTokenDetail(detail: any): string {
    if (!detail?.data) return "No token detail found.";
    const d = detail.data;
    // following details below
    return `
Name: ${d.token_name || "N/A"}
Symbol: ${d.token_symbol || "N/A"}
Decimals: ${d.token_decimals || "N/A"}
isErc20: ${d.is_erc20 || "N/A"}
isErc721: ${d.is_erc721 || "N/A"}
isErc1155: ${d.is_erc1155 || "N/A"}
`;
}

function summarizeHoldersCount(holdersCount: any): string {
    if (!holdersCount?.data && holdersCount?.data !== 0)
        return "No holders count data.";
    return `Holders Count: ${holdersCount.data}`;
}

function summarizeTopHolders(topHolders: any): string {
    if (!topHolders?.data?.length) return "No top holders data available.";
    const topList = topHolders.data
        .slice(0, 5)
        .map((item: any, idx: number) => {
            return `${idx + 1}. Address: ${item.address}, Percentage: ${item.percentage?.toFixed(2) || 0}%`;
        });
    return `Top 5 Holders:\n${topList.join("\n")}`;
}

function summarizeTokenTransfers(transfers: any): string {
    if (!transfers?.data?.length) return "No token transfers data available.";
    const total = transfers.total ?? transfers.data.length;
    const sampleTransfers = transfers.data.slice(0, 3).map((t: any) => {
        return `TxHash: ${t.txhash}, From: ${t.from}, To: ${t.to}, Value: ${t.value}`;
    });
    return `
Total Transfers: ${total}
Recent Transfers:
${sampleTransfers.join("\n")}
`;
}

function summarizeCexVolume(
    cexData: any,
    type: "deposit" | "withdraw"
): string {
    if (!cexData?.data?.length) {
        return `No CEX ${type} data available.`;
    }
    const sample = cexData.data.slice(0, 3).map((entry: any) => {
        return `Timestamp: ${entry.timestamp}, Volume: ${entry.volume} CexName : ${entry.cex_name}`;
    });
    return `Recent CEX ${type} data:\n${sample.join("\n")}`;
}

function summarizeCexHolding(cexHolding: any): string {
    if (!cexHolding?.data?.length) {
        return "No CEX holding data available.";
    }

    // Potentially parse out how much is held by each major exchange
    const sample = cexHolding.data.slice(0, 3).map((entry: any) => {
        return `Timestamp: ${entry.timestamp}, Holding: ${entry.holding} CexName : ${entry.cex_name}`;
    });
    return `
CEX Holdings (Sample):
${sample.join("\n")}
`;
}

/**
 * Build a structured "report" about this token.
 */
function generateTokenFocusedReport(
    chain: string,
    tokenAddress: string,
    analysisResult: TokenAnalysisResult
): string {
    elizaLogger.log({ analysisResult });
    const riskAnalysis = analyzeTokenRisk(analysisResult);

    return `
📊 Token Analysis Report
━━━━━━━━━━━━━━━━━━━━━━

🔗 Network: ${chain.charAt(0).toUpperCase() + chain.slice(1)}
📝 Contract: ${tokenAddress}

📌 Basic Information
-------------------
${summarizeTokenDetail(analysisResult.tokenDetail)}

👥 Holder Statistics
-------------------
${summarizeHoldersCount(analysisResult.holdersCount)}

🏆 Top Holders
${summarizeTopHolders(analysisResult.topHolders)}

📈 Exchange Activity (Last 24h)
---------------------------
• Deposits: ${summarizeCexVolume(analysisResult.cexDeposit, "deposit")}

• Withdrawals: ${summarizeCexVolume(analysisResult.cexWithdraw, "withdraw")}

💰 Current Exchange Holdings
-------------------------
${summarizeCexHolding(analysisResult.cexHolding)}

⚠️ Risk Assessment
----------------
Risk Level: ${getRiskLevelEmoji(riskAnalysis.level)} ${riskAnalysis.level}

${riskAnalysis.factors.length ? "🚩 Key Risk Factors:\n" + riskAnalysis.factors.map((f) => `• ${f}`).join("\n") : "No significant risk factors identified."}

${riskAnalysis.recommendations.length ? "💡 Recommendations:\n" + riskAnalysis.recommendations.map((r) => `• ${r}`).join("\n") : "No specific recommendations at this time."}

make the above response more human readable and concise
`;
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

/**
 * The exported action for your AI agent / bot
 */
export const tokenAnalysisAction: Action = {
    name: "TOKEN_ANALYSIS",
    similes: [
        "ANALYZE_TOKEN",
        "CHECK_TOKEN",
        "INVESTIGATE_TOKEN",
        "TOKEN_INVESTIGATION",
    ],
    validate: async (runtime: IAgentRuntime): Promise<boolean> => {
        const secretKey =
            runtime.getSetting("OXSCOPE_API_KEY") ?? // or 0xscope key if you keep it separate
            process.env.OXSCOPE_API_KEY; // rename if needed
        return Boolean(secretKey);
    },
    description:
        "Performs a token-focused analysis using 0xScope APIs on a specified chain and token address",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        _state: State,
        _options: any,
        callback: HandlerCallback
    ): Promise<any> => {
        try {
            // 1) Retrieve the 0xScope API key
            const secretKey =
                runtime.getSetting("OXSCOPE_API_KEY") ??
                process.env.OXSCOPE_API_KEY; // rename to 0XSCOPE_API_KEY if needed
            if (!secretKey) {
                throw new Error("0xScope API key not configured");
            }

            // 2) Extract token address & chain from user input
            // For simplicity, this naive approach tries to find an address
            const tokenAddress =
                message.content.text.match(/0x[a-fA-F0-9]{40}/)?.[0];
            // You could also parse a "chain" from the message or default to "ethereum"
            const chainMatch = message.content.text.match(/chain=(\w+)/i);
            const chain = chainMatch ? chainMatch[1].toLowerCase() : "ethereum";

            if (!tokenAddress) {
                throw new Error(
                    "No valid token contract address found in the message"
                );
            }

            // 3) Call the "analyzeToken" function
            const analysisResult = await analyzeToken(
                chain,
                tokenAddress,
                secretKey
            );

            // 4) Generate a textual "report"
            const detailedReport = generateTokenFocusedReport(
                chain,
                tokenAddress,
                analysisResult
            );

            // Initialize or update state
            if (!_state) {
                _state = (await runtime.composeState(message)) as State;
            } else {
                _state = await runtime.updateRecentMessageState(_state);
            }

            const context = composeContext({
                state: {
                    ..._state,
                    detailedReport,
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

            // You may also return raw data for your system's own usage
            return {
                raw: analysisResult,
                formatted: detailedReport,
            };
        } catch (error) {
            elizaLogger.error("Token analysis failed:", error);
            throw new Error(`Token analysis failed: ${error.message}`);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Analyze this token: 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48 on chain=ethereum",
                    action: "TOKEN_ANALYSIS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here's the token analysis report...",
                    action: "TOKEN_ANALYSIS",
                },
            },
        ],
    ],
};
