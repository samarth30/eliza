import {
    elizaLogger,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@elizaos/core";

/*****************************************************
 * CONSTANTS & INTERFACES
 *****************************************************/
const BASE_URL = "https://api.0xscope.com/v2";

interface ScopeApiResponse<T> {
    code: number;
    data: T;
    uuid: number;
}

interface ProjectAnalysisResult {
    projectId: string;
    chain: string;
    supportedProjects?: {
        total: number;
        page: number;
        limit: number;
        rows: Array<{
            project_id: string;
            project_name: string;
        }>;
    };
    projectDetail?: {
        website: string;
        twitter: string;
        github: string;
        maintoken: string;
        categorys: string[];
        contracts: string[];
    };
    tvl?: string;
    dailyActiveAddress?: number;
    dailyActiveEntity?: number;
    dailyNewAddress?: number;
    dailyNewEntity?: number;
}

/*****************************************************
 * UTILITY: 0xScope API CALL
 *****************************************************/
async function scopeApiCall<T>(
    endpoint: string,
    secretKey: string
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            "API-KEY": secretKey,
            accept: "*/*",
        },
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    const result: ScopeApiResponse<T> = await response.json();

    if (result.code !== 0) {
        throw new Error(`API returned error code: ${result.code}`);
    }

    return result.data;
}

/*****************************************************
 * CORE ANALYSIS FUNCTIONS
 *****************************************************/

/**
 * 1) Retrieves the list of supported projects (pagination optional).
 */
async function fetchSupportedProjects(
    chain: string,
    limit: number,
    page: number,
    secretKey: string
) {
    const endpoint = `/project/supported?chain=${chain}&limit=${limit}&page=${page}`;
    return scopeApiCall<ProjectAnalysisResult["supportedProjects"]>(
        endpoint,
        secretKey
    );
}

/**
 * 2) Retrieves detailed info for a specific project.
 */
async function fetchProjectDetail(
    projectId: string,
    chain: string,
    secretKey: string
) {
    const endpoint = `/project/detail?project_id=${projectId}&chain=${chain}`;
    return scopeApiCall<ProjectAnalysisResult["projectDetail"]>(
        endpoint,
        secretKey
    );
}

/**
 * 3) Retrieves TVL (total value locked) for a given project on a specific date.
 */
async function fetchProjectTVL(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
) {
    const endpoint = `/project/tvl?project_id=${projectId}&chain=${chain}&date=${date}`;
    return scopeApiCall<string>(endpoint, secretKey);
}

/**
 * 4) Retrieves daily active addresses for a given project on a specific date.
 */
async function fetchDailyActiveAddress(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
) {
    const endpoint = `/project/activeAddress?project_id=${projectId}&chain=${chain}&date=${date}`;
    return scopeApiCall<number>(endpoint, secretKey);
}

/**
 * 5) Retrieves daily active entities for a given project on a specific date.
 */
async function fetchDailyActiveEntity(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
) {
    const endpoint = `/project/activeEntity?project_id=${projectId}&chain=${chain}&date=${date}`;
    return scopeApiCall<number>(endpoint, secretKey);
}

/**
 * 6) Retrieves daily new addresses for a given project on a specific date.
 */
async function fetchDailyNewAddress(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
) {
    const endpoint = `/project/newAddress?project_id=${projectId}&chain=${chain}&date=${date}`;
    return scopeApiCall<number>(endpoint, secretKey);
}

/**
 * 7) Retrieves daily new entities for a given project on a specific date.
 */
async function fetchDailyNewEntity(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
) {
    const endpoint = `/project/newEntity?project_id=${projectId}&chain=${chain}&date=${date}`;
    return scopeApiCall<number>(endpoint, secretKey);
}

/*****************************************************
 * AGGREGATOR: MAIN FUNCTION
 *****************************************************/
async function analyzeProject(
    projectId: string,
    chain: string,
    date: string,
    secretKey: string
): Promise<ProjectAnalysisResult> {
    elizaLogger.log(
        `Starting project-level analysis for [${projectId}] on chain [${chain}] at date [${date}].`
    );

    // Get a list of supported projects (you can skip or limit for performance)
    const supportedProjects = await fetchSupportedProjects(
        chain,
        10,
        1,
        secretKey
    );

    // Get project detail
    const projectDetail = await fetchProjectDetail(projectId, chain, secretKey);

    // For TVL & daily stats, 0xScope generally wants a date. If no date is provided, you could omit these or use a default.
    const tvl = await fetchProjectTVL(projectId, chain, date, secretKey);
    const dailyActiveAddress = await fetchDailyActiveAddress(
        projectId,
        chain,
        date,
        secretKey
    );
    const dailyActiveEntity = await fetchDailyActiveEntity(
        projectId,
        chain,
        date,
        secretKey
    );
    const dailyNewAddress = await fetchDailyNewAddress(
        projectId,
        chain,
        date,
        secretKey
    );
    const dailyNewEntity = await fetchDailyNewEntity(
        projectId,
        chain,
        date,
        secretKey
    );

    return {
        projectId,
        chain,
        supportedProjects,
        projectDetail,
        tvl,
        dailyActiveAddress,
        dailyActiveEntity,
        dailyNewAddress,
        dailyNewEntity,
    };
}

/*****************************************************
 * HELPER: CREATE A HUMAN-FRIENDLY REPORT
 *****************************************************/
function generateProjectReport(data: ProjectAnalysisResult): string {
    const {
        projectId,
        chain,
        supportedProjects,
        projectDetail,
        tvl,
        dailyActiveAddress,
        dailyActiveEntity,
        dailyNewAddress,
        dailyNewEntity,
    } = data;

    return `PROJECT ANALYSIS REPORT
======================================
Project ID: ${projectId}
Chain: ${chain}

1) Project Details
-----------------
${
    projectDetail
        ? `
Website: ${projectDetail.website}
Twitter: ${projectDetail.twitter}
GitHub: ${projectDetail.github}
Main Token: ${projectDetail.maintoken}
Categories: ${projectDetail.categorys.join(", ")}
Number of Contracts: ${projectDetail.contracts.length}`
        : "No detail found"
}

2) TVL (Total Value Locked)
--------------------------
${tvl ? `$${Number(tvl).toLocaleString()}` : "No TVL data"}

3) Daily Activity Metrics
------------------------
Active Addresses: ${dailyActiveAddress?.toLocaleString() ?? "N/A"}
Active Entities: ${dailyActiveEntity?.toLocaleString() ?? "N/A"}
New Addresses: ${dailyNewAddress?.toLocaleString() ?? "N/A"}
New Entities: ${dailyNewEntity?.toLocaleString() ?? "N/A"}

4) Supported Projects Sample
--------------------------
${
    supportedProjects
        ? supportedProjects.rows
              .slice(0, 5)
              .map((p) => `- ${p.project_name} (${p.project_id})`)
              .join("\n")
        : "N/A"
}
======================================`;
}

/*****************************************************
 * ELIZAOS ACTION
 *****************************************************/
export const projectAnalysisAction: Action = {
    name: "PROJECT_ANALYSIS",
    similes: ["PROJECT_INVESTIGATION", "PROJECT_DATA", "DEFI_ANALYSIS"],
    validate: async (runtime: IAgentRuntime): Promise<boolean> => {
        const secretKey =
            runtime.getSetting("OXSCOPE_API_KEY") ?? // or 0xscope key if you keep it separate
            process.env.OXSCOPE_API_KEY; // rename if needed
        return Boolean(secretKey);
    },
    description:
        "Performs project-level or high-level data analysis using 0xScope's project endpoints",
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

            // Naive approach to parse "project_id=..." and "chain=..." and "date=..."
            // from the user’s message. Adjust with better parsing/regex if needed.
            const projectIdMatch =
                message.content.text.match(/project_id=(\S+)/i);
            const chainMatch = message.content.text.match(/chain=(\S+)/i);
            const dateMatch = message.content.text.match(/date=(\S+)/i);

            if (!projectIdMatch) {
                throw new Error("No project_id found in the user message");
            }

            const projectId = projectIdMatch[1];
            const chain = chainMatch ? chainMatch[1].toLowerCase() : "ethereum";
            const date = dateMatch ? dateMatch[1] : "2024-01-01"; // or any default date

            // 1) Perform the project-level analysis
            const analysisData = await analyzeProject(
                projectId,
                chain,
                date,
                secretKey
            );

            // 2) Generate a textual summary or “report”
            const report = generateProjectReport(analysisData);

            // 3) Return or display it
            await callback({ text: report });
            return {
                raw: analysisData,
                formatted: report,
            };
        } catch (error) {
            elizaLogger.error("Project analysis failed:", error);
            throw new Error(`Project analysis failed: ${error.message}`);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Analyze project_id=uniswap-v2 chain=ethereum date=2023-04-23",
                    action: "PROJECT_ANALYSIS",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Here is your project-level analysis report...",
                    action: "PROJECT_ANALYSIS",
                },
            },
        ],
    ],
};
