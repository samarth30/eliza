import { Plugin } from "@elizaos/core";
import { addressAnalysisAction } from "./actions/addressAnalysis";
import { socialMediaLevelAnalyses } from "./actions/socialMediaLevelAnalyses";
import { tokenAnalysisAction } from "./actions/tokenAnalyses";
import { riskEntityAnalysisAction } from "./actions/riskAnalyses.ts";
import { projectAnalysisAction } from "./actions/projectLevelAnalyses.ts";
export * as actions from "./actions/index.ts";

export const securityPlugin: Plugin = {
    name: "SECURITY",
    description: "Security plugin for Eliza",
    actions: [
        projectAnalysisAction,
        riskEntityAnalysisAction,
        addressAnalysisAction,
        tokenAnalysisAction,
        socialMediaLevelAnalyses,
    ],
    evaluators: [],
    providers: [],
};
