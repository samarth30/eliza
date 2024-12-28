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

/*****************************************************
 * CONSTANTS & INTERFACES
 *****************************************************/
const BASE_URL = "https://api.0xscope.com/v2";

/**
 * Data shape for Twitter info about a single address.
 */
interface TwitterInfo {
    id?: string;
    username?: string;
    name?: string;
    url?: string;
    verified?: boolean;
    description?: string;
    created_at?: string;
    pinned_tweet_id?: string | null;
    profile_image_url?: string;
    followers_count?: number;
    following_count?: number;
    listed_count?: number;
    tweet_count?: number;
    address?: string; // Added for batch responses
}

/**
 * Data shape for the chart activity or records.
 */
interface TwitterActivity {
    date: string[];
    official_count: number[];
    other_count: number[];
}

interface TwitterRecord {
    id: string;
    author_id: string;
    attachments: string | null;
    source: string | null;
    lang: string;
    tweets: string;
    conversation_id: string;
    in_reply_to_user_id: string | null;
    reply_settings: string;
    context_annotations: string | null;
    public_metrics: string;
    created_at: string;
    possibly_sensitive: boolean;
    referenced_tweets_id: string | null;
    referenced_tweets_type: string | null;
    username: string;
    name: string;
    profile_image_url: string;
    verified: boolean;
    referenced_tweets_username: string | null;
    retweeted_username: string | null;
    retweeted_name: string | null;
    retweeted_profile_image_url: string | null;
    retweeted_verified: boolean | null;
}

// Add this interface after the TwitterRecord interface
interface TwitterRecordsResponse {
    total: number;
    page: number;
    limit: number;
    rows: TwitterRecord[];
}

interface SocialMediaRiskAnalysis {
    level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    factors: string[];
    recommendations: string[];
}

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
    const data = await response.json();

    // Check both HTTP status and API response code
    if (!response.ok || data.code !== 0) {
        throw new Error(
            `API call failed: ${data.message || response.statusText}`
        );
    }

    return data;
}

/**
 * 1) Fetch single twitter info for an address.
 */
async function fetchTwitterInfo(
    address: string,
    chain: string,
    secretKey: string
): Promise<TwitterInfo> {
    const endpoint = `/social/twitterInfo?address=${address}&chain=${chain}`;
    const resp = await scopeApiCall(endpoint, secretKey);
    if (resp.code !== 0) {
        throw new Error(
            `Failed to fetch Twitter info: ${resp.message || "Unknown error"}`
        );
    }
    return resp.data;
}

/**
 * 2) Fetch twitter info in batch for multiple addresses.
 */
async function fetchTwitterInfoBatch(
    addresses: string[],
    chain: string,
    secretKey: string
): Promise<TwitterInfo[]> {
    const endpoint = `/social/twitterInfo_batch`;
    const payload = { addresses, chain };
    const resp = await scopeApiCall(endpoint, secretKey, "POST", payload);
    return resp.data || [];
}

/**
 * 3) Fetch twitter activity chart for a given address (counts over time).
 */
async function fetchTwitterActivityChart(
    address: string,
    chain: string,
    secretKey: string
): Promise<TwitterActivity> {
    const endpoint = `/social/twitterActivityChart?address=${address}&chain=${chain}`;
    const resp = await scopeApiCall(endpoint, secretKey);
    if (resp.code !== 0) {
        throw new Error(
            `Failed to fetch Twitter activity: ${resp.message || "Unknown error"}`
        );
    }
    return resp.data;
}

/**
 * 4) Fetch official twitter records for an address.
 */
async function fetchTwitterRecordsOfficial(
    address: string,
    chain: string,
    limit: number,
    page: number,
    secretKey: string
): Promise<TwitterRecordsResponse> {
    const endpoint = `/social/twitterRecordsOfficial?address=${address}&chain=${chain}&limit=${limit}&page=${page}`;
    const resp = await scopeApiCall(endpoint, secretKey);
    return resp.data;
}

/**
 * 5) Fetch non-official twitter records for an address.
 */
async function fetchTwitterRecordsNotOfficial(
    address: string,
    chain: string,
    limit: number,
    page: number,
    secretKey: string
): Promise<TwitterRecordsResponse> {
    const endpoint = `/social/twitterRecordsNotOfficial?address=${address}&chain=${chain}&limit=${limit}&page=${page}`;
    const resp = await scopeApiCall(endpoint, secretKey);
    return resp.data;
}

/*****************************************************
 * ANALYSIS FUNCTION
 *****************************************************/
/**
 * Aggregates and analyzes the Twitter / social media data for multiple addresses.
 *  - Single or batch twitter info
 *  - Optionally, fetch activity chart and records
 */
async function analyzeTwitterSocial(
    addresses: string[],
    chain: string,
    secretKey: string
) {
    elizaLogger.log(
        `Starting Twitter/Social analysis for ${addresses.length} addresses on chain [${chain}]...`
    );

    // 1) We can fetch batch info for all addresses at once
    const batchInfo = await fetchTwitterInfoBatch(addresses, chain, secretKey);

    // 2) For each address, optionally get activity + official / not official records
    const results: any[] = [];

    for (const address of addresses) {
        const activityChart = await fetchTwitterActivityChart(
            address,
            chain,
            secretKey
        );
        const officialRecords = await fetchTwitterRecordsOfficial(
            address,
            chain,
            10,
            1,
            secretKey
        );
        const notOfficialRecords = await fetchTwitterRecordsNotOfficial(
            address,
            chain,
            10,
            1,
            secretKey
        );
        const matchedFromBatch = batchInfo.find(
            (bi) => bi.address?.toLowerCase() === address.toLowerCase()
        );

        results.push({
            address,
            twitterInfo: matchedFromBatch,
            activityChart,
            officialRecords,
            notOfficialRecords,
        });
    }

    return results;
}

function analyzeSocialMediaRisk(
    twitterInfo: TwitterInfo
): SocialMediaRiskAnalysis {
    const riskFactors: string[] = [];
    const recommendations: string[] = [];
    let riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";

    if (!twitterInfo.username) {
        riskLevel = "MEDIUM";
        riskFactors.push("No associated Twitter account found");
        recommendations.push("Verify identity through other social channels");
    }

    if (twitterInfo.followers_count !== undefined) {
        if (twitterInfo.followers_count < 10) {
            riskLevel = "HIGH";
            riskFactors.push(
                "Very low follower count - possible new or fake account"
            );
            recommendations.push(
                "Investigate account creation date and activity patterns"
            );
        }
    }

    if (twitterInfo.tweet_count !== undefined && twitterInfo.tweet_count < 5) {
        riskLevel = "MEDIUM";
        riskFactors.push(
            "Very low tweet count - possible inactive or fake account"
        );
        recommendations.push("Check account activity consistency");
    }

    // Additional checks based on API data
    if (twitterInfo.created_at) {
        const accountAge =
            Date.now() - new Date(twitterInfo.created_at).getTime();
        const daysOld = accountAge / (1000 * 60 * 60 * 24);
        if (daysOld < 30) {
            riskLevel = "HIGH";
            riskFactors.push("Account less than 30 days old");
            recommendations.push(
                "Exercise caution with newly created accounts"
            );
        }
    }

    if (
        !twitterInfo.verified &&
        twitterInfo.followers_count &&
        twitterInfo.followers_count > 10000
    ) {
        riskLevel = "MEDIUM";
        riskFactors.push("High follower count but not verified");
        recommendations.push(
            "Verify account authenticity through additional channels"
        );
    }

    return {
        level: riskLevel,
        factors: riskFactors,
        recommendations,
    };
}

function generateTwitterSocialReport(analysisResults: any[]): string {
    // Escape special characters for markdown
    const escapeMarkdown = (text: string) => {
        return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
    };

    let report = `📱 TWITTER / SOCIAL MEDIA INTELLIGENCE REPORT
═══════════════════════════════════════════════\n`;

    for (const item of analysisResults) {
        const {
            address,
            twitterInfo,
            activityChart,
            officialRecords,
            notOfficialRecords,
        } = item;

        const riskAnalysis = analyzeSocialMediaRisk(twitterInfo || {});

        report += `🔗 Address: ${escapeMarkdown(address)}
───────────────────────────────────────────────

📊 Twitter Profile
----------------
${
    twitterInfo
        ? `• Username: @${escapeMarkdown(twitterInfo.username || "N/A")}
• Followers: ${twitterInfo.followers_count?.toLocaleString() || "N/A"}
• Following: ${twitterInfo.following_count?.toLocaleString() || "N/A"}
• Total Tweets: ${twitterInfo.tweet_count?.toLocaleString() || "N/A"}
• Created: ${twitterInfo.created_at ? new Date(twitterInfo.created_at).toLocaleDateString() : "N/A"}
• Verified: ${twitterInfo.verified ? "✓ Yes" : "✗ No"}`
        : "No Twitter profile found"
}

📈 Activity Overview
-----------------
${
    activityChart && activityChart.date && activityChart.date.length > 0
        ? activityChart.date
              .slice(0, 3)
              .map(
                  (date, i) =>
                      `• ${date}: ${activityChart.official_count[i]} official, ${activityChart.other_count[i]} mentions`
              )
              .join("\n")
        : "No activity data available"
}

🔵 Recent Activity
---------------
${
    officialRecords && officialRecords.rows && officialRecords.rows.length > 0
        ? `Official Tweets (${officialRecords.total.toLocaleString()} total):\n` +
          officialRecords.rows
              .slice(0, 3)
              .map((r) => {
                  const metrics = JSON.parse(r.public_metrics);
                  return `• ${new Date(r.created_at).toLocaleDateString()}: ${escapeMarkdown(
                      r.tweets.length > 100
                          ? r.tweets.substring(0, 100) + "..."
                          : r.tweets
                  )} (${metrics.retweet_count}🔄 ${metrics.like_count}❤️)`;
              })
              .join("\n")
        : "No official tweets found"
}
${
    notOfficialRecords &&
    notOfficialRecords.rows &&
    notOfficialRecords.rows.length > 0
        ? `\nMentions (${notOfficialRecords.total.toLocaleString()} total):\n` +
          notOfficialRecords.rows
              .slice(0, 3)
              .map((r) => {
                  const metrics = JSON.parse(r.public_metrics);
                  const isRetweet = r.referenced_tweets_type === "retweeted";
                  const prefix = isRetweet ? "🔄 " : "💬 ";
                  const author = isRetweet
                      ? r.retweeted_username
                          ? `@${escapeMarkdown(r.retweeted_username)}`
                          : escapeMarkdown(r.retweeted_name || "Unknown")
                      : `@${escapeMarkdown(r.username)}`;
                  return `• ${prefix}${new Date(r.created_at).toLocaleDateString()} ${author}: ${escapeMarkdown(
                      r.tweets.length > 100
                          ? r.tweets.substring(0, 100) + "..."
                          : r.tweets
                  )} (${metrics.retweet_count}🔄 ${metrics.like_count}❤️)`;
              })
              .join("\n")
        : "\nNo mentions found"
}

⚠️ Risk Assessment
----------------
Risk Level: ${getRiskLevelEmoji(riskAnalysis.level)} ${riskAnalysis.level}

${
    riskAnalysis.factors.length
        ? "🚩 Risk Factors:\n" +
          riskAnalysis.factors.map((f) => `• ${escapeMarkdown(f)}`).join("\n")
        : "No significant risk factors identified"
}

${
    riskAnalysis.recommendations.length
        ? "💡 Recommendations:\n" +
          riskAnalysis.recommendations
              .map((r) => `• ${escapeMarkdown(r)}`)
              .join("\n")
        : "No specific recommendations at this time"
}

═══════════════════════════════════════════════\n`;
    }
    return report;
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

/*****************************************************
 * ELIZAOS ACTION
 *****************************************************/
export const socialMediaLevelAnalyses: Action = {
    name: "TWITTER_SOCIAL_ANALYSIS",
    similes: ["SOCIAL_ANALYSIS", "TWITTER_INVESTIGATION"],
    validate: async (runtime: IAgentRuntime): Promise<boolean> => {
        const secretKey =
            runtime.getSetting("OXSCOPE_API_KEY") ?? // or 0xscope key if you keep it separate
            process.env.OXSCOPE_API_KEY; // rename if needed
        return Boolean(secretKey);
    },
    description:
        "Performs Twitter / Social Media analysis using 0xScope endpoints for a set of addresses.",
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

            // Extract addresses from the user’s message
            // E.g., "Check social for these addresses: 0xabc..., 0xdef..., chain=ethereum"
            const found = message.content.text.match(/0x[a-fA-F0-9]{40}/g);
            if (!found || found.length === 0) {
                throw new Error("No valid addresses found in message");
            }
            const chainMatch = message.content.text.match(/chain=(\w+)/i);
            const chain = chainMatch ? chainMatch[1].toLowerCase() : "ethereum";

            // 1) Perform the social analysis
            const analysisResults = await analyzeTwitterSocial(
                found,
                chain,
                secretKey
            );

            // 2) Generate a textual summary
            const detailedReport = generateTwitterSocialReport(analysisResults);

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
            return {
                raw: analysisResults,
                formatted: detailedReport,
            };
        } catch (error) {
            elizaLogger.error("Twitter / Social Media analysis failed:", error);
            throw new Error(
                `Twitter / Social Media analysis failed: ${error.message}`
            );
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Check social for these addresses: 0xd533a949740bb3306d119cc777fa900ba034cd52, 0x934b510d4c9103e6a87aef13b816fb080286d649 chain=ethereum",
                    action: "TWITTER_SOCIAL_ANALYSIS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here is your social media analysis...",
                    action: "TWITTER_SOCIAL_ANALYSIS",
                },
            },
        ],
    ],
};
