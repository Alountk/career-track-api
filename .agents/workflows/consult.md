---
description: Invokes the Software Consultant agent to analyze the current codebase or a specific module.
---
# Software Consultation Workflow

This workflow triggers a comprehensive analysis of the project's health, focusing on architecture, security, and quality.

## Steps

1. **Scan Scope Selection**
   - Identify the files or modules to be analyzed (by default, the entire `src` directory or specific task files).

2. **Run Analysis Protocols**
   - Apply the **Software Consultant Skill** to the selected scope.
   - For each file, evaluate:
     - Architectural adherence (Hexagonal Layers).
     - Security (Validation, Authentication, Authorization).
     - Code Quality (Complexity, BUGS, Naming).

3. **Generate Report**
   - Create a structured report with:
     - **Overall Health Score**: 1-10.
     - **Critical Issues (Bugs/Security)**: Actionable list.
     - **Architectural Recommendations**.
     - **Suggested Code Improvements**.

4. **Review with User**
   - Present the report and wait for feedback before applying any suggested changes.
