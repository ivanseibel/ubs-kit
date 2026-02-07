# **Use Agent Skills in VS Code**

Version 1.109 is now available\! Read about the new features and fixes from January.

Agent Skills are folders of instructions, scripts, and resources that GitHub Copilot can load when relevant to perform specialized tasks. Agent Skills is an open standard (https://agentskills.io) that works across multiple AI agents, including GitHub Copilot in VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.

Unlike custom instructions that primarily define coding guidelines, skills enable specialized capabilities and workflows that can include scripts, examples, and other resources. Skills you create are portable and work across any skills-compatible agent.

## **Key benefits of Agent Skills**

* **Specialize Copilot:** Tailor capabilities for domain-specific tasks without repeating context.  
* **Reduce repetition:** Create once, use automatically across all conversations.  
* **Compose capabilities:** Combine multiple skills to build complex workflows.  
* **Efficient loading:** Only relevant content loads into context when needed.

## **Agent Skills vs custom instructions**

While both Agent Skills and custom instructions help customize Copilot's behavior, they serve different purposes:

| Feature | Agent Skills | Custom Instructions |
| :---- | :---- | :---- |
| **Purpose** | Teach specialized capabilities and workflows | Define coding standards and guidelines |
| **Portability** | Works across VS Code, Copilot CLI, and Copilot coding agent | VS Code and GitHub.com only |
| **Content** | Instructions, scripts, examples, and resources | Instructions only |
| **Scope** | Task-specific, loaded on-demand | Always applied (or via glob patterns) |
| **Standard** | Open standard (agentskills.io) | VS Code-specific |

### **Use Agent Skills when you want to:**

* Create reusable capabilities that work across different AI tools.  
* Include scripts, examples, or other resources alongside instructions.  
* Share capabilities with the wider AI community.  
* Define specialized workflows like testing, debugging, or deployment processes.

### **Use custom instructions when you want to:**

* Define project-specific coding standards.  
* Set language or framework conventions.  
* Specify code review or commit message guidelines.  
* Apply rules based on file types using glob patterns.

## **Create a skill**

Skills are stored in directories with a SKILL.md file that defines the skill's behavior. VS Code supports two types of skills:

* **Project skills, stored in your repository:** .github/skills/ (recommended) or .claude/skills/ (legacy, for backward compatibility).  
* **Personal skills, stored in your user profile:** \~/.copilot/skills/ (recommended) or \~/.claude/skills/ (legacy, for backward compatibility).

**Tip:** You can configure additional locations where VS Code searches for skills by using the chat.agentSkillsLocations setting. This is useful for sharing skills across projects or keeping them in a central location.

### **To create a skill:**

1. Create a .github/skills directory in your workspace.  
2. Create a subdirectory for your skill. Each skill should have its own directory (for example, .github/skills/webapp-testing).  
3. Create a SKILL.md file in the skill directory with the following structure:

\---  
name: skill-name  
description: Description of what the skill does and when to use it  
\---

\# Skill Instructions

Your detailed instructions, guidelines, and examples go here...

4. Optionally, add scripts, examples, or other resources to your skill's directory.

## **SKILL.md file format**

The SKILL.md file is a Markdown file with YAML frontmatter that defines the skill's metadata and behavior.

### **Header (required)**

| Field | Required | Description |
| :---- | :---- | :---- |
| name | Yes | A unique identifier for the skill. Must be lowercase, using hyphens for spaces (for example, webapp-testing). Maximum 64 characters. |
| description | Yes | A description of what the skill does and when to use it. Be specific about both capabilities and use cases to help Copilot decide when to load the skill. Maximum 1024 characters. |

### **Body**

The skill body contains the instructions, guidelines, and examples that Copilot should follow when using this skill. Write clear, specific instructions that describe:

* What the skill helps accomplish.  
* When to use the skill.  
* Step-by-step procedures to follow.  
* Examples of the expected input and output.  
* References to any included scripts or resources.

You can reference files within the skill directory using relative paths. For example, to reference a script in your skill directory, use \[test script\](./test-template.js).

## **How Copilot uses skills**

Skills use progressive disclosure to efficiently load content only when needed. This three-level loading system ensures you can install many skills without consuming context:

* **Level 1: Skill discovery:** Copilot always knows which skills are available by reading their name and description from the YAML frontmatter. This metadata is lightweight and helps Copilot decide which skills are relevant to your request.  
* **Level 2: Instructions loading:** When your request matches a skill's description, Copilot loads the SKILL.md file body into its context. Only then do the detailed instructions become available.  
* **Level 3: Resource access:** Copilot can access additional files in the skill directory (scripts, examples, documentation) only as needed. These resources don't load until Copilot references them, keeping your context efficient.

This architecture means skills are automatically activated based on your prompt... you don't need to manually select them. You can install many skills, and Copilot will load only what's relevant for each task.

## **Use shared skills**

You can use skills created by others to enhance Copilot's capabilities. The github/awesome-copilot repository contains a growing community collection of skills, custom agents, instructions, and prompts.

**Tip:** Always review shared skills before using them to ensure they meet your requirements and security standards. VS Code's terminal tool provides controls for script execution, including auto-approve options with configurable allow-lists and tight controls over which code runs.