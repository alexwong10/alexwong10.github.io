---
layout: post
title: "jemalloc 原理及内存管理"
date: 2025-04-15 21:00:00 +0800
tags: [jemalloc, Linux, 内存管理, 性能优化]
excerpt: "性能优化时对jemalloc的深入学习。顺便谈谈内存管理机制。"
mathjax: true
---

## 引言

虚拟内存是操作系统对物理内存的抽象，为应用程序提供了一个连续的地址空间。Linux进程的地址空间通常分为几个区域，包括代码段、数据段、堆、栈、库等。
常见布局如下所示：


可以通过pmap命令查看进程的内存布局。如下是一个简单的C程序的内存布局示例：

```

```




内存管理单元负责虚拟地址到物理地址的转换。




## 机制
### 分配

### 释放

### 回收

### 痛点与难点
- 多线程
- 多核
- 内存碎片

## jemalloc


### 调优
https://pkold.com/docs/jemalloc/06-tuning/

## 其它开源项目
### tcmalloc

### mimalloc


