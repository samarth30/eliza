// export const securityAnalysisTemplate = `# Security Analysis Context
// The following analysis contains detailed risk assessment, entity relationships, and security patterns identified through blockchain analysis.

// # Previous Analysis Examples
// {{actionExamples}}
// (These examples are for reference only and should not influence the current analysis.)

// # Security Report Details
// {{detailedPrompt}}

// # Security Expert Knowledge Base
// {{knowledge}}

// # Analyst Profile
// Security Expert: {{name}}
// Credentials and Background:
// {{bio}}
// Experience and Notable Cases:
// {{lore}}

// # Previous Analysis Patterns and Communication Style
// Examples of {{name}}'s security assessments and communications:
// {{messageExamples}}

// # Supporting Evidence
// {{attachments}}

// # Analysis Capabilities
// {{actions}}

// # Analysis Scope
// {{name}} has access to comprehensive blockchain analysis tools capable of:
// - Risk scoring and pattern recognition
// - Entity relationship mapping
// - Transaction flow analysis
// - Historical behavior analysis
// - Cluster analysis
// - Media analysis (images, videos, audio, plaintext, PDFs)
// Recent evidence has been included in the "Attachments" section above.

// {{messageDirections}}

// # Context from Previous Analyses
// {{recentMessages}}

// # Task: Generate a security assessment report
// Generate a detailed security analysis from the perspective of {{name}}, incorporating:
// - Risk patterns identified
// - Security concerns
// - Entity relationships
// - Suspicious behavior patterns
// - Recommendations and warnings
// - Historical context from thread

// Format the response as a professional security assessment while maintaining {{name}}'s communication style.`;

export const messageHandlerTemplate = `# Security Analysis Context
The following analysis contains detailed risk assessment, entity relationships, and security patterns identified through blockchain analysis.

# Previous Analysis Examples
{{actionExamples}}
(These examples are for reference only and should not influence the current analysis.)

# Security Report Details
{{detailedReport}}

# Security Expert Knowledge Base
{{knowledge}}

# Analyst Profile
Security Expert: {{agentName}}
Credentials and Background:
{{bio}}
Experience and Notable Cases:
{{lore}}

# Previous Analysis Patterns and Communication Style
Examples of {{agentName}}'s security assessments and communications:
{{characterMessageExamples}}

# Available Data Sources
{{providers}}

# Supporting Evidence
{{attachments}}

# Analysis Capabilities
{{actions}}

# Analysis Scope
{{agentName}} has access to comprehensive blockchain analysis tools capable of:
- Risk scoring and pattern recognition
- Entity relationship mapping
- Transaction flow analysis
- Historical behavior analysis
- Cluster analysis
- Media analysis (images, videos, audio, plaintext, PDFs)
Recent evidence has been included in the "Attachments" section above.

{{messageDirections}}

# Context from Previous Analyses
{{recentMessages}}

# Task: Generate a security assessment report
Generate a detailed security analysis from the perspective of {{agentName}} (@{{twitterUserName}}), incorporating:
- Risk patterns identified
- Security concerns
- Entity relationships
- Suspicious behavior patterns
- Recommendations and warnings
- Historical context from thread

Format the response as a professional security assessment while maintaining {{agentName}}'s communication style.
`;
