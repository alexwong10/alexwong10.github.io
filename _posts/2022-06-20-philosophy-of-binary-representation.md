---
layout: post
title: "Philosophy of binary representation: finite bits VS infinite information"
date: 2022-06-20
categories: coding
header-img: "img/posts/20220620/zero-one.png"
tags: [15-213]
author: Cheung Wong
mathjax: true
---

## TL;DR: Bits are not everything. Everything can be bits. 
It is widely know that data are encoded as 0-1 representation in comupter science due to its electronic implementation. But what is the behind it? In my opinion, the represention is a typical example of ubiquitous fight between finiteness and infiniteness in computer science.
> All information in a system—including disk files, programs stored in memory, user data stored in memory, and data transferred across a network—is represented as a bunch of bits. The only thing that distinguishes different data objects is the context in which we view them. 

### Bit: binary unit
The bit is the most important unit of information in computing and digital communicatins. Its values are most commonly represented as either 1 or 0, while in fact we can of course represent it as any binary things such as _true/false_, _yes/no_, etc. The key is that a bit is **binary**, which means it can only provide limited information. A binary representation of fixed size can be seen as a 0-1 sequence of fixed length. We denote the length as w. Then the size of the encoding space is no more than $2^w$. Therefore, it can never represent everything. This is why Ints are not equal to Integers and Doubles are not equal to reals.

Still, we say everything can be bits, because we can always find a way to encode its carrying information into corresponding bits. If the space's size is not big enough, we can simply increase the sequence length to introduce more bit to used. Even for infinity, we can represent it in a tricky way too. For example, in IEEE 754-1985 standard for Floating-Point Arithmetic, +infinity is represented as ```7F800000```.  

### Systematic encoding matters
However, random encoding doomed the binary world to chaos. At least we won't want to see representation conflict, which is unavoidable if everyone encodes things as the way he/she likes and there is no unified code. So the encodings are generally bijections, or say, one-one mapping and commonly accepted as standards. 

Meanwhile, many more subtle things are worthwhile to be considered. Take binary representation of numbers for example. On one hand, we would like to keep mathematical properties such as monotonicity, group properties in the encoding space. On the other hand, it is impossible for us to always increase representation's size, so we should carefully inspect how much information we need to represent and accordingly choose a proper sequence length. As a result, many conventions/standards are proposed and established to construct an ordered encoding system. 

### Three key pieces
To wrap up, when representing a number with 0-1 sequences, three aspects must be considered. 
- Range. Given a fixed length of sequence, the number of 'everything' we can represent is also fixed. We must cherish each bit and carefully choose how many things we really want to represent.
- Overflow. What if something beyond the range unexpectedly appear? It is so-called _overflow_. But in fact, such overflowing things are always mapped into the space, result in a conflict and cause a chain effect.
- Conversion. It is unavoidable that more than one encoding rules are adopted due to so many thing we need to represent. How to convert a value under one rule to a value under another rule? In this sense, conversion is a composite function. In C/C++, this process is defined as _casting_. 

> buffer overflow vulnerabilities have accounted for many of the security holes in network and Internet servers.

You can learn more from CMU course 15-213 or its textbook CS:APP.