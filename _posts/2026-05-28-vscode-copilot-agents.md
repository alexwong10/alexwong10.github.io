---
layout: post
title: "在Copilot使用中学习、理解agent"
date: 2026-05-28 21:00:00 +0800
tags: [GitHub Copilot, Agent, AI应用]
excerpt: "agent的许多概念听起来不难，但具体细节值得玩味"
---

## 引言

因为公司合规问题，日常工作中用基本VSCode + Copilot，而不是Codex或者Claude Code。~~（这俩没有承诺不用客户数据来训练）~~。虽然讨论度不如后两者，但Copilot支持了各种agent的玩法。本文结合官方文档对相关内容进行了整理和分析。

## agent的自主性
> An agent is an AI assistant that works autonomously to complete a coding task

在VSCode语境下，agent是一个可以自主工作以完成一个编码任务的助手。其中最关键的是自主性。所谓autonomously，至少包含以下三点：
- agent可以根据目标自己规划执行步骤。我们不用事无巨细地描述要如何完成某项任务
- agent可以自己访问文件、编辑文件、运行命令、调用工具。我们不用像早期使用LLM那样，在对话框里和AI聊天，然后把内容复制粘贴到IDE里
- 执行任务出错的时候，AI可以自己进行修复。我们不用时刻盯着执行过程，在AI遇到问题而终止任务的时候输入新指令 

相应地，要达到以上效果，应用agent的时候，就要重点关注以下要素：
- 我们任务的目标是什么，这一个目标是不是agent能做到的，也就是常被提及AI能力边界
- 要赋予agent哪些权限
- 出错的时候，AI的修复是否真的满足我们的要求。

对于agent开发者来说，则面临着以下问题：
- 怎么保证agent的运行始终围绕目标
- agent要如何完成访问编辑等操作
- 怎么判断任务是否出错以及agent要怎么知道如何解决问题

## agentic循环
agent的工作模式可以概括为一个agentic循环。如下图：

![Agentic循环](/img/posts/20260528/agent-loop.png)

其中包含三个阶段：
- **理解Understand**：一方面是理解提示词；另一方面是通过工具调用理解现状。这样agent才能知道具体要做什么。同时，在执行、验证之后，也要理解新的情况，以进行新的计划。
- **执行Act**：执行理解之后的计划。执行方式可以很多种，包括修改文件、运行命令、安装依赖、调用外部服务等，本质上也是工具调用。
- **验证Validate**：通过工具调用，验证执行的结果是否满足预期。如果出错了，就继续迭代

和前一节对比就能发现，在agent中，agentic循环和自主性是一体两面的。前者更侧重于描述agent如何工作（如何实现自主性），而后者则侧重于描述agent的属性。

## 上下文

LLM可以在给定输入的情况下生成内容。由于LLM是无状态的，一次请求中，LLM所处理的信息量就是它的上下文。
它可能包括系统提示词、对话历史、文件内容、工具调用结果、用户发送的消息等，如下图。
![上下文组成](/img/posts/20260528/context-assembly.png)

为了让agent生成得到更加符合预期的输出，管理上下文的时候至少有两方面的事情要做：
### 尽量将相关的内容纳入上下文
- 指定需要的内容。
最朴素的方式就是在提示词中说明要参考什么什么文件。VSCode也支持通过[#号](https://code.visualstudio.com/docs/chat/copilot-chat-context)添加内容。
对于原则性的内容，则可以考虑利用instruction机制保证它在每一次对话中都生效
- 保留需要的内容。
随着对话进行，上下文难免会越来越大。当上下文窗口填满时，VSCode会自动进行上下文压缩。用户也可以通过/compact的方式进行主动压缩，并且可以在压缩时指定偏好，从而避免信息丢失。

### 尽量将不相关的内容排除出上下文
不相关的内容可以来自当前的仓库。前面提到的指定需要的内容，实际上也是在避免不相关的文本被处理。
而在agent运行的动态语境下，这些内容还可能来自：
- 当前任务的历史记录。压缩可以让我们舍弃掉一些不再相关的内容，比如工具调用产生的一些中间结果
- 其它任务的历史记录。VSCode按会话（session）来管理任务，确保不同session之间上下文互不影响。如果要执行一个全新的任务，最好的做法也是新开一个session。

### 记忆
不同任务不一定是完全不相关的。比如在同一个代码仓库中，开发不同的feature，编码原则、仓库架构等内 容实际上是可以复用的。
记忆是用来解决跨任务的上下文复用问题的，可以理解成一种特殊的上下文。
跨任务可以在不同的层面体现，与之相应的，记忆可以存储在不同的层面。

- 不同用户执行的任务。用户级记忆放在/memories/，每次会话都会自动加载。
- 不同的仓库中执行的任务。VSCode中，仓库级记忆存放在/memories/repo/
- 同一仓库中执行的不同任务。如果是同一会话，VSCode会把记忆存放在/memories/sessions/，关闭对话的时候就会清空。如果是跨会话，记忆存放在/memories/repo/，它对整个工作区都生效。
plan型agent实际上就是在/memories/sessions/中写入一个plan.md

### 子agent
>A subagent is an independent AI agent that performs focused work, such as researching a topic or analyzing code, and reports the results back to the main agent.

执行复杂任务的时候，主agent可以将部分任务分发给独立的agent执行。这些独立的agent就是子agent。
子agent拥有与主agent隔离的上下文。在分发任务的时候，尽量把任务相关的上下文传递给子agent，能使其更专注于任务本身。
从这个角度来说，子agent可以理解成一种优化上下文的机制。
对主agent来说，子agent会同步执行，主agent要等待子agent返回结果后才能继续执行。不同的子agent可以并行执行。

使用子agent的[典型场景](https://code.visualstudio.com/docs/agents/subagents)包括：
- 子agent对最佳实践、已有库文件、当前仓库范式等不同层面进行研究，由主agent实现功能
- 子agent从不同的角度进行代码分析或审查，由主agent输出报告
- 子agent探索不同的解决方案，由主agent进行方案比较
- 子agent对同一问题使用不同的模型进行分析，由主agent进行汇总

## 使用技巧
### 事先规划
VSCode提供了一个[plan](https://code.visualstudio.com/docs/copilot/agents/planning)型agent。这一种agent也对应着经典的agent范式：Plan-and-Execute。顾名思义，就是在具体代码实现之前先完成设计。设计过程中，如果发现有问题，可以及时纠正，避免中途发现有问题而带来不必要的时间和token消耗。

plan型agent的输出是一个plan.md，文档会存在/memories/session/plan.md。可以通过运行**Chat: Show Memory Files**获取。

为了让plan型agent更加符合用意，还可以进行[定制](https://code.visualstudio.com/docs/copilot/customization/custom-agents)。定制的时候可以选择指定的模型和调用工具。比如以下例子：
```
---
description: Generate an implementation plan for new features or refactoring existing code.
name: Planner
tools: ['web/fetch', 'search/codebase', 'search/usages']
model: ['Claude Opus 4.5', 'GPT-5.2']  # Tries models in order
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
---
# Planning instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

### 定制化
同一个问题，在不同的提示词影响下，LLM可以给出不同的答案。为了让LLM生成跟符合我们意图的内容，往往需要进行定制。这正是提示词所做的事情。
#### 定制instructions
在.github目录下，创建一个copilot-instruction.md，可以让AI按照对应的标准去完成编码等任务。对于已有的代码库，也可以通过在对话框中输入/init自动生成instructions
  
#### 定制agent
在介绍plan型agent的时候就提到了可以定制agent。简单来说，就是在.github/agents目录下，创建一个md文件。在md文件中，指定agent执行任务时的工作流等细节。
通过这种方式创建的agent和默认的plan/agent/ask模式的agent是并列关系的。因此可以在对话框中直接选定。

### 利用好上下文
#### 新的任务，新的会话
如果要执行一项不相关的任务，应该新开一个session，避免其它任务的无关的上下文干扰

#### 有选择性的添加上下文
不要总是使用整个仓库。避免仓库中的无关上下文干扰

#### 定制instruction
将一些始终存在的规则写成instruction，确保每一次提示词都会封装。

