# **Custom agents in VS Code**

Version 1.109 is now available\! Read about the new features and fixes from January.

Custom agents enable you to configure the AI to adopt different personas tailored to specific development roles and tasks. For example, you might create agents for a security reviewer, planner, solution architect, or other specialized roles. Each persona can have its own behavior, available tools, and instructions.

You can also use handoffs to create guided workflows between agents, allowing you to transition seamlessly from one specialized agent to another with a single click. For example, you could move from planning agent directly into implementation agent; or hand off to a code reviewer with the relevant context.

This article describes how to create and manage custom agents in VS Code.

**Note:** Custom agents are available as of VS Code release 1.106. Custom agents were previously known as custom chat modes.

## **What are custom agents?**

The built-in agents provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own custom agents.

Custom agents consist of a set of instructions and tools that are applied when you switch to that agent. For example, a "Plan" agent could include instructions for generating an implementation plan and only use read-only tools. By creating a custom agent, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom agents are defined in a agent.md Markdown file, and can be stored in your workspace for others to use; or in your user profile, where you can reuse them across different workspaces.

You can reuse your custom agents in background agents and cloud agents, enabling you to run autonomous tasks with the same specialized configurations.

## **Why use custom agents?**

Different tasks require different capabilities. A planning agent might only need read-only tools for research and analysis to prevent accidental code changes: while an implementation agent would need full editing capabilities. Custom agents let you specify exactly which tools are available for each task, ensuring the AI has the right capabilities for the job.

Custom agents also let you provide specialized instructions that define how the AI should operate. For instance, a planning agent could instruct the AI to collect project context and generate a detailed implementation plan, while a code review agent might focus on identifying security vulnerabilities and suggesting improvements. These specialized instructions ensure consistent, task-appropriate responses every time you switch to that agent.

**Note:** Subagents can run with a custom agent. Learn more about running subagents with custom agents (experimental).

## **Handoffs**

Handoffs enable you to create guided sequential workflows that transition between agents with suggested next steps. After a chat response completes, handoff buttons appear that let users move to the next agent with relevant context and a pre-filled prompt.

Handoffs are useful for orchestrating multi-step workflows, that give developer's control for reviewing and approving each step before moving to the next one. For example:

* **Planning → Implementation:** Generate a plan in planning agent, then hand off to implementation agent to start coding.  
* **Implementation → Review:** Complete implementation, then switch to a code review agent to check for quality and security issues.  
* **Write Failing Tests → Write Passing Tests:** Generate failing tests that are easier to review than big implementations, then hand off to make those tests pass by implementing the required code changes.

To define handoffs in your agent file, add them to the frontmatter. Each handoff specifies the target agent, the button label, and an optional prompt to send:

\---  
description: Generate an implementation plan  
tools: \['search', 'fetch'\]  
handoffs:  
  \- label: Start Implementation  
    agent: implementation  
    prompt: Now implement the plan outlined above.  
    send: false  
    model: GPT-5.2 (copilot)  
\---

When users see the handoff button and select it, they switch to the target agent with the prompt pre-filled. If send: true, the prompt automatically submits to start the next workflow step.

## **Custom agent file structure**

Custom agent files are Markdown files and use the agent.md extension.

**Note:** VS Code detects any .md files in the .github/agents folder of your workspace as custom agents.

### **Header (optional)**

The header is formatted as YAML frontmatter with the following fields:

| Field | Description |
| :---- | :---- |
| description | A brief description of the custom agent, shown as placeholder text in the chat input field. |
| name | The name of the custom agent. If not specified, the file name is used. |
| argument-hint | Optional hint text shown in the chat input field to guide users on how to interact with the custom agent. |
| tools | A list of tool or tool set names that are available for this custom agent. Can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. |
| agents | A list of agent names that are available as subagents in this agent. Use to allow all agents, or an empty array \[\] to prevent any subagent use. |
| model | The AI model to use when running the prompt. Specify a single model name or a prioritized list. |
| user-invokable | Optional boolean flag to control whether the agent appears in the agents dropdown (default is true). |
| disable-model-invocation | Optional boolean flag to prevent the agent from being invoked as a subagent (default is false). |
| target | The target environment for the custom agent (vscode or github-copilot). |
| mcp-servers | Optional list of MCP server config json to use with custom agents in GitHub Copilot. |
| handoffs | Optional list of suggested next actions or prompts to transition between custom agents. |

### **Body**

The custom agent file body contains the custom agent implementation, formatted as Markdown. This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this custom agent.

You can reference other files by using Markdown links: for example to reuse instructions files. To reference agent tools in the body text, use the \#tool:\<tool-name\> syntax.

## **Create a custom agent**

You can create a custom agent file in your workspace or user profile.

1. Select **Configure Custom Agents** from the agents dropdown and then select **Create new custom agent** (or run the Chat: New Custom Agent command).  
2. Choose the location where the custom agent file should be created:  
   * **Workspace:** .github/agents folder to only use it within that workspace.  
   * **User profile:** current profile folder to use it across all your workspaces.  
3. Enter a file name for the custom agent.  
4. Provide the details for the custom agent in the newly created agent.md file.

## **Customize the agents dropdown list**

To show or hide specific custom agents:

1. Select **Configure Custom Agents** from the agents dropdown.  
2. Hover over a custom agent in the list, and then select the eye icon to show or hide it.

## **Tool list priority**

The list of available tools in chat is determined by the following priority order:

1. Tools specified in the prompt file (if any).  
2. Tools from the referenced custom agent in the prompt file (if any).  
3. Default tools for the selected agent (if any).

## **Share custom agents across teams**

To share custom agents across your team, you can create a workspace-level custom agent. If you want to share across multiple workspaces, you can define them at the GitHub organization level. VS Code automatically detects custom agents defined at the organization level to which your account has access.

To enable discovery of organization-level custom agents, set github.copilot.chat.organizationCustomAgents.enabled to true.

## **Frequently asked questions**

### **Are custom agents different from chat modes?**

Custom agents were previously known as custom chat modes. The functionality remains the same: the terminology has been updated to better reflect their purpose. If you have existing .chatmode.md files, rename them to agent.md.

### **How do I remove a custom agent?**

* Delete the corresponding agent.md file from your workspace or user profile.  
* Select **Configure Custom Agents** from the agents dropdown, hover over the agent, and select the trash icon.

### **How do I know where a custom agent comes from?**

Hover over the custom agent in the **Configure Custom Agents** list to see the source location in a tooltip.

## **Related resources**

* Customize AI with custom instructions.  
* Create reusable prompt files.  
* Use tools in chat.