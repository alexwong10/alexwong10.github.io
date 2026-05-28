---
layout: post
title: "在Copilot使用中学习、理解agent"
date: 2026-05-28 21:00:00 +0800
tags: [GitHub Copilot, Agent, AI应用]
excerpt: "agent的许多概念听起来不难，但具体细节值得玩味"
---

## 引言

因为公司合规问题，日常工作中用基本VSCode + Copilot，而不是Codex或者Claude Code。~~（这俩没有承诺不用客户数据来训练）~~。虽然讨论度不如后两者，但Copilot支持了各种agent的玩法。本文基于VSCode 官方文档整理，把其中的agent体系讲成一张能记住的地图。关键概念都链接到原文，方便继续深挖。

## 1. 先选入口：你要它坐在旁边，还是自己去跑？

![VS Code Copilot Agents 四类入口](/img/posts/20260528/copilot-agent-map.svg)

官方 [Copilot coding agents overview](https://code.visualstudio.com/docs/copilot/agents/overview) 把 agents 放在一个共同框架里：它们可以理解高层目标、规划步骤、编辑代码、运行命令，并在出错后尝试修正。区别不在“是不是 Agent”，而在它运行在哪里，以及你希望它以什么形式交付结果。

| 场景                              | 更适合的入口                                                                               | 核心理由                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| 需求还模糊，需要边问边改          | [本地 Agent](https://code.visualstudio.com/docs/copilot/agents/local-agents)               | 能看当前 workspace、编辑器上下文和本地工具反馈 |
| 任务明确，但会花一段时间          | [Copilot CLI](https://code.visualstudio.com/docs/copilot/agents/copilot-cli)               | 在本地后台运行，适合用 worktree 隔离并行任务   |
| 目标清楚，希望最后产出 PR         | [Cloud Agent](https://code.visualstudio.com/docs/copilot/agents/cloud-agents)              | 在 GitHub 云端运行，天然面向分支、提交和 PR    |
| 想把 Claude、Codex 等放进 VS Code | [Third-party Agents](https://code.visualstudio.com/docs/copilot/agents/third-party-agents) | 统一在 VS Code 里管理不同代理和模型能力        |
| 同时开了很多任务                  | [Agents Window](https://code.visualstudio.com/docs/copilot/agents/agents-window)           | 以任务为中心查看会话、变更和后续操作           |

这张表可以当作日常判断口诀：模糊任务先本地，明确任务可后台，团队交付走云端，模型生态看第三方。

### 本地 Agent：和你一起坐在 VS Code 里

[Local agents](https://code.visualstudio.com/docs/copilot/agents/local-agents) 是最像“结对编程”的入口。它们在你的 VS Code 会话中工作，可以读取代码库、编辑文件、调用工具、运行终端命令，也能利用你安装的扩展工具和 MCP 工具。

本地 Agent 的价值不只是“会改代码”。它最大的优势是反馈短：你看到它的计划、它看到你的文件、你能随时打断或补充上下文。适合调试、探索老项目、迁移小模块、解释错误日志这类需要来回对齐的任务。

不过要注意，“本地 Agent”不等于模型一定在本机运行。官方文档也提醒，代理可以在本地 VS Code 中执行工具，但语言模型本身可能仍由远端服务提供。

### Copilot CLI：把明确任务放到后台

[Copilot CLI](https://code.visualstudio.com/docs/copilot/agents/copilot-cli) 更像一个本地后台执行器。你可以从终端或 VS Code 启动任务，让它在本地环境里独立跑，并通过 Git worktree 把变更隔离起来。

这个入口适合“我知道要做什么，但不想盯着它每一步”的任务，例如：补测试、修一批 lint、完成一个小功能、迁移某个 API 的调用方式。CLI 的重点不是聊天体验，而是让任务变成一个可观察、可回收、可继续的后台会话。

它也有边界：CLI 不等于完整复刻你的 VS Code 交互上下文，某些扩展工具、远程开发场景和本地 MCP 工具会有差异。把它当作“本地任务执行队列”，会比把它当作万能 IDE 更稳。

### Cloud Agent：把任务交给 GitHub 侧的 PR 流程

[Cloud agents](https://code.visualstudio.com/docs/copilot/agents/cloud-agents) 运行在 GitHub 托管环境里。它们更适合需求已经明确、边界比较清晰、最后希望通过 PR 审阅的任务。

它和本地 Agent 的差别很实际：云端 Agent 没有你的编辑器即时状态，也不天然拥有本机运行环境；但它和仓库、分支、提交、Pull Request 的关系更直接。换句话说，本地 Agent 更像一起在桌面上推演，Cloud Agent 更像你给一个 issue，它去开分支、改代码、提 PR。

### 第三方 Agent：让 VS Code 成为统一入口

[Third-party agents](https://code.visualstudio.com/docs/copilot/agents/third-party-agents) 解决的是另一个问题：既然团队可能同时用 Claude、OpenAI Codex 等不同代理，VS Code 能不能成为统一工作台？

官方文档把第三方 agents 分成本地和云端两类。它们可以以扩展、CLI 或 Partner Agent 的方式接入 VS Code，并和 Copilot 订阅、模型授权、会话管理一起工作。这个能力还带有明显的 Preview 色彩，适合愿意尝鲜、也愿意处理权限和计费边界的团队。

## 2. Agents Window：从“代码窗口”切到“任务窗口”

[Agents Window](https://code.visualstudio.com/docs/copilot/agents/agents-window) 是这套体系里最容易被低估的一环。它不是又一个聊天侧边栏，而是一个 agent-first 的界面：你可以在里面创建、查看、继续多个 agent 会话，并检查它们产生的变更。

当你只开一个任务时，Chat 够用；当你同时让一个本地 Agent 查 bug、一个 CLI 会话补测试、一个云端 Agent 做 PR，普通聊天面板就不够了。Agents Window 的作用是把这些工作从“对话列表”提升到“任务列表”。

它还支持进入特定 workspace、查看会话详情、管理自定义设置，并在 VS Code 或浏览器环境中使用。官方把它标为 Preview，所以实际使用时要把它看成快速演进中的工作台，而不是最终形态。

## 3. 规划、记忆、工具：Agent 能不能靠谱，主要看这三件事

![Copilot Agents 的规划、记忆和工具层](/img/posts/20260528/copilot-agent-stack.svg)

很多人第一次用 Agent 会犯一个小错误：给它一句很大的目标，然后期待它自动完成全部工程判断。官方这几篇文档其实在反复强调另一件事：Agent 的能力来自上下文、工具和约束。

### 规划：先让 Agent 把“要做什么”说清楚

[Planning](https://code.visualstudio.com/docs/copilot/agents/planning) 文档介绍的 Plan agent，就是专门用来先做计划的。它会收集上下文、必要时追问，然后把任务拆成实现步骤和验证步骤。

我会把 Plan agent 用在三类任务上：

- 需求一句话说不完，比如“重构认证逻辑”；
- 影响范围不清楚，比如“把旧接口迁到新 SDK”；
- 需要先对齐验收标准，比如“修复偶现的性能下降”。

一个好的计划不只是待办清单，它应该说清楚改哪些模块、为什么这么改、如何验证。官方 [Agents tutorial](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial) 里也把 Plan agent 放在从任务到实现的路线中，这很符合真实开发节奏：先想清楚，再让 Agent 开工。

### 记忆：把稳定偏好留住，而不是每次重新解释

[Memory](https://code.visualstudio.com/docs/copilot/agents/memory) 解决的是“上下文会断”的问题。VS Code 里有两类记忆：

| 类型           | 放在哪里      | 适合记什么                             |
| -------------- | ------------- | -------------------------------------- |
| Local Memory   | 本机文件      | 个人偏好、项目约定、当前会话计划       |
| Copilot Memory | GitHub 托管侧 | 仓库级经验，供不同 Copilot agents 复用 |

这很像团队里的新人笔记。不要把所有临时想法都塞进去，适合写入记忆的是稳定、可复用、下次还会影响判断的东西，例如：项目偏好的测试命令、组件命名习惯、不要改动的生成文件、部署脚本的特殊约束。

官方也提醒 Copilot Memory 仍是 Preview，并且有保留期限和可用范围限制。我的建议是：把 Memory 当成“项目习惯缓存”，不要当成永久知识库。

### 工具和权限：Agent 的手脚，也需要刹车

[Agent tools](https://code.visualstudio.com/docs/copilot/agents/agent-tools) 是最工程化的一页。没有工具，Agent 只能猜；有了工具，它才能查代码、看文件、跑测试、读网页、调用 MCP、使用扩展能力。

但工具越多，越要关心权限。VS Code 提供了不同的确认模式，用来控制文件编辑、终端命令、URL 访问、工具调用等行为。日常开发里我更倾向于从默认权限开始，只在隔离 worktree、临时分支或明确的沙箱任务里放宽确认。

可以这样理解：工具决定 Agent 能到哪里去，权限决定它走到门口时要不要先敲门。

## 4. 子代理：把复杂问题拆给独立上下文

[Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents) 是一个很有用但也容易被误解的能力。它不是让你手动多开几个聊天窗口，而是让主 Agent 把某些子任务派给独立上下文中的小 Agent。

典型用途包括：

- 让一个子代理专门读测试失败日志；
- 让一个子代理检查安全风险；
- 让一个子代理梳理文档或 API 使用方式；
- 让多个子代理并行探索不同方案，主 Agent 最后汇总。

它的价值在“隔离”。主会话不用塞满所有细节，子代理可以只拿到与任务相关的上下文。对于大型代码库，这比把所有文件都扔进同一个对话里更容易保持清醒。

如果团队已经写了自定义 agent，也可以把它作为 subagent 使用，让它带着自己的工具、提示词和模型偏好去处理专门问题。官方文档里也提到，嵌套子代理默认关闭，这个默认值很合理：并行有用，递归失控就麻烦了。

## 5. 一条可复用的实践路线

![从一句需求到 PR 的 Copilot Agents 工作流](/img/posts/20260528/copilot-agent-workflow.svg)

把官方 [Agents tutorial](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial) 抽象一下，可以得到一条很实用的路线：

1. 在 VS Code 里用本地 Agent 澄清目标，让它先读相关文件和错误信息；
2. 切到 Plan agent，让它产出计划、影响范围和验证点；
3. 如果任务明确但耗时，交给 Copilot CLI 在 worktree 里后台实现；
4. 如果需要团队审阅或 issue 到 PR 的闭环，交给 Cloud Agent；
5. 回到 Agents Window 看会话、查变更、跑测试，决定是否合并。

这条路线的重点不是每次都用满所有入口，而是把不同阶段交给最合适的工具。小修小补不必上云端，大型重构不该省略规划，危险命令不该随便放权，PR 也不该跳过人类 review。

## 6. 我的使用建议

如果你刚开始用 VS Code Copilot Agents，可以按下面这个顺序试：

- 先用本地 Agent 做解释、定位和小改动，熟悉它如何读项目；
- 碰到跨模块任务时，先用 Plan agent 出计划，再决定是否执行；
- 对明确、重复、耗时的任务，尝试 Copilot CLI 和 worktree；
- 对 issue 清楚、适合 PR 的任务，再尝试 Cloud Agent；
- 需要跨模型能力时，再评估第三方 agents 的授权、计费和权限边界；
- 把 Memory 用来记录稳定约定，不要让它堆满一次性的上下文；
- 工具权限从保守开始，只在可回滚的分支或沙箱里放宽。

Agents 的真正价值不是替你省掉判断，而是把“读上下文、列计划、改代码、跑验证、整理交付”这些步骤串成一个可协作的循环。你仍然是工程负责人，Agent 是一个能动手、能汇报、也需要边界的队友。

## 原文索引

- [Copilot coding agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [Tutorial: Use Copilot agents in VS Code](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial)
- [Agents Window](https://code.visualstudio.com/docs/copilot/agents/agents-window)
- [Planning with Copilot agents](https://code.visualstudio.com/docs/copilot/agents/planning)
- [Memory in VS Code agents](https://code.visualstudio.com/docs/copilot/agents/memory)
- [Agent tools](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
- [Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [Local agents](https://code.visualstudio.com/docs/copilot/agents/local-agents)
- [Copilot CLI](https://code.visualstudio.com/docs/copilot/agents/copilot-cli)
- [Cloud agents](https://code.visualstudio.com/docs/copilot/agents/cloud-agents)
- [Third-party agents](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
