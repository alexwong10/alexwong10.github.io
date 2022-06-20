---
layout: post
show_date: true
title: "Binary Representation of Numbers in Computer Science"
date: 2022-06-20
categories: computer science
img: posts/20220620/zero-one.png
tags: [15-213]
author: cheungwong
Description: "It is widely know that data are encoded as 0-1 representation in comupter science due to its electronic implementation. But how it is done? In this blog, we discusss representations of integers and floating point numbers."
---

> TL;DR: Everything is bits, while each bit is 0 or 1. 

### Philosophy of binary representation: finite bits VS infinite information
The bit is the most important unit of information in computing and digital communicatins. Its values are most commonly represented as either 1 or 0, while in fact we can of course represent it as any binary things such as _true/false_, _yes/no_, etc. The key is that a bit is **binary**, which means it can only provide limited information. A binary representation of fixed length can never represent everything.

We say everything is bits, because we can always find a way to encode its carrying information into corresponding bits. If the bit count is not enough, we can simply increase it. Even for infinity, we can represent it in a tricky way too. For example, in IEEE 754-1985 standard for Floating-Point Arithmetic, +infinity is represented as ```7F800000```.  

However, random encoding doomed the binary world to chaos. At least we won't want to see representation conflict, which is unavoidable if everyone encodes things as the way he/she likes. Meanwhile, many more subtle things are worthwhile to be considered. 

Take binary representation of numbers as an example, on one hand, we would like to keep mathmetical properties such as monotonicity, group properties and so on. On the other hand, it is impossible for us to always increase the bit count, so we should carefully inspect how much information we need to represent and accordingly choose a proper bit count. As a result, many conventions/standards are proposed and established to construct an ordered encoding system. 

### Integers
Above is the philosophy of the binary representation. Now we look further into specific representation of integers. 

### Floating point Numbers
Floating point numbers are more difficult to represent. 


To wrap up, when representing a number with 0-1 sequences, three aspects must be considered. 
- Range
- Overflow
- Conversion

You can learn more from CMU course 15-213 or the textbook CSAPP.