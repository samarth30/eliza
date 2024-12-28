import {
    elizaLogger,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@elizaos/core";

const BASE_URL = "https://api.0xscope.com/v2";

/*****************************************************
 * DATA STRUCTURES
 *****************************************************/
interface RiskItem {
    address: string;
    totalScore: number;
    highScore: number;
    mediumScore: number;
    lowScore: number;
}

interface RiskBatchResult {
    code: number;
    data: RiskItem[];
    uuid: number;
}

interface EntityRiskItem {
    address: string;
    certainty: number;
    riskScore: number;
}

interface EntityRiskResponse {
    code: number;
    data: EntityRiskItem[];
    uuid: number;
}

interface RelatedAddress {
    address: string;
    certainty: number;
    description: string[];
}

interface RelatedReason {
    connectionType: string;
    proof: string[];
}

interface RelatedReasonResponse {
    total: number;
    rows: RelatedReason[];
}

/**
 * We’ll store all consolidated data in this structure.
 */
interface RiskEntityAnalysisResult {
    address: string;
    riskItem?: RiskItem;
    riskDetails?: RiskDetail[];
    entityRisk?: EntityRiskItem[];
    relatedAddresses?: RelatedAddress[];
    relatedReasons?: RelatedReasonResponse;
    clusterEntity?: string[][];
}

interface RiskReason {
    txhash: string | null;
    related_addr: string;
    total_value: number | null;
    type: string;
}

interface RiskDetail {
    riskName: string;
    riskType: string;
    riskLevel: string;
    riskDescription: string;
    riskReason: RiskReason[];
}

interface RiskDetailResult {
    address: string;
    addressRiskType: RiskDetail[];
}

interface RiskDetailBatchResponse {
    code: number;
    data: RiskDetailResult[];
    uuid: number;
}

interface RelatedAddressResponse {
    code: number;
    data: RelatedAddress[];
    uuid: number;
}

/*****************************************************
 * UTILITY: 0xScope API CALL
 *****************************************************/
async function scopeApiCall(
    endpoint: string,
    secretKey: string,
    method: "GET" | "POST" = "GET",
    bodyObj?: any
): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    const init: RequestInit = {
        method,
        headers: {
            "API-KEY": secretKey,
            accept: "*/*",
            "Content-Type": "application/json",
        },
    };
    if (bodyObj) {
        init.body = JSON.stringify(bodyObj);
    }

    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    return response.json();
}

/*****************************************************
 * MAIN LOGIC: RISK & ENTITY ANALYSIS
 *****************************************************/

/**
 * 1) Fetch risk scores in batch for an array of addresses.
 */
async function fetchRiskScoresBatch(
    addresses: string[],
    chain: string,
    secretKey: string
): Promise<RiskBatchResult> {
    const endpoint = `/kye/riskyScoreBatch`;
    const payload = { addresses, chain };
    const response = await scopeApiCall(endpoint, secretKey, "POST", payload);
    return response;
}

/**
 * 2) Fetch risk details in batch for an array of addresses.
 */
async function fetchRiskDetailsBatch(
    addresses: string[],
    chain: string,
    secretKey: string
): Promise<RiskDetailBatchResponse> {
    const endpoint = `/kye/riskyDetailBatch`;
    const payload = { addresses, chain };
    const response = await scopeApiCall(endpoint, secretKey, "POST", payload);
    return response;
}

/**
 * 3) Fetch entity-level risk for a single address (one by one).
 */
async function fetchEntityRisk(
    address: string,
    chain: string,
    secretKey: string
): Promise<EntityRiskResponse> {
    const endpoint = `/kye/entityRisk?address=${address}&chain=${chain}`;
    const response = await scopeApiCall(endpoint, secretKey);
    return response;
}

/**
 * 4) Fetch related addresses for a single address.
 */
async function fetchRelatedAddresses(
    address: string,
    chain: string,
    secretKey: string
): Promise<RelatedAddressResponse> {
    const endpoint = `/entity/relatedAddress?address=${address}&chain=${chain}`;
    const response = await scopeApiCall(endpoint, secretKey);
    return response;
}

/**
 * 5) (Optional) For each related address, fetch the reasons they are connected.
 * This might produce many requests, so be mindful of rate limits.
 */
async function fetchRelatedReasons(
    address: string,
    relatedAddress: string,
    chain: string,
    secretKey: string
): Promise<RelatedReasonResponse | undefined> {
    const endpoint = `/entity/relatedReason?address=${address}&relatedAddress=${relatedAddress}&chain=${chain}`;
    const response = await scopeApiCall(endpoint, secretKey, "GET");

    // Return the structured data from API response
    return response.data;
}

/**
 * 6) (Optional) Entity clustering for multiple addresses in one shot.
 */
async function clusterAddresses(
    addresses: string[],
    chain: string,
    secretKey: string
): Promise<any> {
    const endpoint = `/entity/clusters`;
    const payload = {
        addresses,
        chain,
    };
    const response = await scopeApiCall(endpoint, secretKey, "POST", payload);
    return response.data; // or entire response
}

/**
 * Consolidates everything into a single array of results, one per address.
 */
export async function analyzeRiskAndEntities(
    addresses: string[],
    chain: string,
    secretKey: string
): Promise<RiskEntityAnalysisResult[]> {
    elizaLogger.log(
        `Starting Risk & Entity Analysis for ${addresses.length} addresses on ${chain}`
    );

    // 1) risk scores batch
    const riskScoresBatch = await fetchRiskScoresBatch(
        addresses,
        chain,
        secretKey
    );
    // 2) risk details batch
    const riskDetailsBatch = await fetchRiskDetailsBatch(
        addresses,
        chain,
        secretKey
    );
    // 3) optional: cluster addresses (all at once)
    const clusterInfo = await clusterAddresses(addresses, chain, secretKey);

    const results: RiskEntityAnalysisResult[] = [];

    // For each address, fetch entity risk & related addresses
    for (const address of addresses) {
        // riskScoresBatch => find the matching entry
        const riskScoreItem = riskScoresBatch?.data?.find(
            (r) => r.address.toLowerCase() === address.toLowerCase()
        );

        const riskDetailItem = riskDetailsBatch.data?.find(
            (r) => r.address.toLowerCase() === address.toLowerCase()
        );

        const entityRiskResponse = await fetchEntityRisk(
            address,
            chain,
            secretKey
        );
        const relatedAddressResponse = await fetchRelatedAddresses(
            address,
            chain,
            secretKey
        );

        // Get related reasons for the first few related addresses (to avoid too many API calls)
        const relatedReasons =
            relatedAddressResponse.data.length > 0
                ? await fetchRelatedReasons(
                      address,
                      relatedAddressResponse.data[0].address,
                      chain,
                      secretKey
                  )
                : undefined;

        results.push({
            address,
            riskItem: riskScoreItem,
            riskDetails: riskDetailItem?.addressRiskType,
            entityRisk: entityRiskResponse.data,
            relatedAddresses: relatedAddressResponse.data,
            relatedReasons,
            clusterEntity: clusterInfo, // Array of address clusters from clusterAddresses
        });
    }

    return results;
}

/*****************************************************
 * GENERATING A REPORT / PROMPT
 *****************************************************/
function generateRiskEntityReport(results: RiskEntityAnalysisResult[]): string {
    let output = `RISK & ENTITY ANALYSIS REPORT\n====================================\n`;

    for (const item of results) {
        output += `\nAddress: ${item.address}\n--------------------------\n`;

        // Risk Scores
        if (item.riskItem) {
            output += `Risk Scores:\n`;
            output += ` - Total Risk Score: ${item.riskItem.totalScore}\n`;
            output += ` - High Risk Score: ${item.riskItem.highScore}\n`;
            output += ` - Medium Risk Score: ${item.riskItem.mediumScore}\n`;
            output += ` - Low Risk Score: ${item.riskItem.lowScore}\n`;
        }

        // Risk Details
        if (item.riskDetails?.length > 0) {
            output += `\nRisk Details:\n`;
            for (const risk of item.riskDetails) {
                output += ` - ${risk.riskName} (${risk.riskLevel})\n`;
                output += `   Type: ${risk.riskType}\n`;
                output += `   Description: ${risk.riskDescription}\n`;
                if (risk.riskReason.length > 0) {
                    output += `   Evidence:\n`;
                    for (const reason of risk.riskReason) {
                        output += `    * ${reason.type}`;
                        if (reason.txhash) output += ` (TX: ${reason.txhash})`;
                        if (reason.total_value)
                            output += ` Value: ${reason.total_value}`;
                        if (reason.related_addr)
                            output += ` Related: ${reason.related_addr}`;
                        output += `\n`;
                    }
                }
            }
        }

        // Entity Risks
        if (item.entityRisk?.length > 0) {
            output += `\nEntity Risk Analysis:\n`;
            for (const risk of item.entityRisk) {
                output += ` - Address: ${risk.address}\n`;
                output += `   Certainty: ${risk.certainty}%\n`;
                output += `   Risk Score: ${risk.riskScore}\n`;
            }
        }

        // Related Addresses
        if (item.relatedAddresses?.length > 0) {
            output += `\nRelated Addresses (Top 10 by certainty):\n`;
            const sortedAddresses = [...item.relatedAddresses]
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

        // Related Reasons
        if (item.relatedReasons?.rows?.length > 0) {
            output += `\nConnection Details:\n`;
            for (const reason of item.relatedReasons.rows) {
                output += ` - ${reason.connectionType}\n`;
                if (reason.proof?.length > 0) {
                    output += `   Proof: ${reason.proof.join(", ")}\n`;
                }
            }
        }

        // Cluster Info
        if (item.clusterEntity?.length > 0) {
            output += `\nAddress Clusters:\n`;
            item.clusterEntity.forEach((cluster, index) => {
                if (cluster.length > 1) {
                    output += ` - Cluster ${index + 1} (${cluster.length} addresses):\n`;
                    output += `   ${cluster.join("\n   ")}\n`;
                }
            });
        }

        output += `\n------------------------------------\n`;
    }

    return output;
}

/*****************************************************
 * ELIZAOS ACTION DEFINITION
 *****************************************************/
export const riskEntityAnalysisAction: Action = {
    name: "RISK_ENTITY_ANALYSIS",
    similes: ["RISK_ANALYSIS", "ENTITY_ANALYSIS", "SECURITY_CHECK"],
    validate: async (runtime: IAgentRuntime): Promise<boolean> => {
        const secretKey =
            runtime.getSetting("OXSCOPE_API_KEY") ?? // or 0xscope key if you keep it separate
            process.env.OXSCOPE_API_KEY; // rename if needed
        return Boolean(secretKey);
    },
    description:
        "Performs Risk & Entity Analysis using 0xScope endpoints in batch",
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
                process.env.OXSCOPE_API_KEY; // rename to 0XSCOPE_API_KEY if needed
            if (!secretKey) {
                throw new Error("0xScope API key not configured");
            }

            // 1) Extract addresses from the user’s message
            //    For example, we look for all 0x addresses with a naive regex
            const found = message.content.text.match(/0x[a-fA-F0-9]{40}/g);
            if (!found || found.length === 0) {
                throw new Error("No valid addresses found in message");
            }

            // 2) Determine chain - you could parse from text or default to "ethereum"
            const chainMatch = message.content.text.match(/chain=(\w+)/i);
            const chain = chainMatch ? chainMatch[1].toLowerCase() : "ethereum";

            // 3) Perform analysis
            const analysisResults = await analyzeRiskAndEntities(
                found,
                chain,
                secretKey
            );

            // 4) Generate a human-friendly report
            const report = generateRiskEntityReport(analysisResults);

            // 5) Send back the result
            await callback({ text: report });
            return {
                raw: analysisResults,
                formatted: report,
            };
        } catch (error) {
            elizaLogger.error("Risk & Entity Analysis failed:", error);
            throw new Error(`Risk & Entity Analysis failed: ${error.message}`);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Check risk for these addresses: 0x934b510d4c9103e6a87aef13b816fb080286d649, 0xedd650a1b2d7e7049e1228bb5e60bd4cd5f7d67b chain=ethereum",
                    action: "RISK_ENTITY_ANALYSIS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here is the risk & entity analysis report...",
                    action: "RISK_ENTITY_ANALYSIS",
                },
            },
        ],
    ],
};
