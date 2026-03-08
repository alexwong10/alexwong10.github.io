---
layout: post
title: "Philosophy of binary representation: finite bits VS infinite information"
date: 2022-06-20
tags: [Computer Science]
excerpt: "TL;DR: Bits are not everything. Everything can be bits. "
mathjax: true
lang: en
---

## TL;DR: Bits are not everything. Everything can be bits. 
It is widely know that data are encoded as 0-1 representation in comupter science due to its electronic implementation. But what is philosophy the behind it? In my opinion, the represention is a typical example of ubiquitous fight between finiteness and infiniteness in computer science.
> All information in a system—including disk files, programs stored in memory, user data stored in memory, and data transferred across a network—is represented as a bunch of bits. The only thing that distinguishes different data objects is the context in which we view them. 

### **Bit: binary unit**
The bit is the most important unit of information in computing and digital communicatins. Its values are most commonly represented as either 1 or 0, while in fact we can of course represent it as any binary things such as _true/false_, _yes/no_, etc. The key is that a bit is **binary**, which means it can only provide limited information. A binary representation of fixed size can be seen as a 0-1 sequence of fixed length. We denote the length as w. Then the size of the encoding space is no more than $2^w$. Therefore, it can never represent everything. This is why Ints are not equal to Integers and Doubles are not equal to reals.

Still, we say everything can be bits, because we can always find a way to encode its carrying information into corresponding bits. If the space's size is not big enough, we can simply increase the sequence length to introduce more bit to used. Even for infinity, we can represent it in a tricky way too. For example, in IEEE 754-1985 standard for Floating-Point Arithmetic, +infinity is represented as ```7F800000```.  

### **Systematic encoding matters**
However, random encoding doomed the binary world to chaos. At least we won't want to see representation conflict, which is unavoidable if everyone encodes things as the way he/she likes and there is no unified code. So the encodings are generally bijections, or say, one-one mapping and commonly accepted as standards. 

Meanwhile, many more subtle things are worthwhile to be considered. Take binary representation of numbers for example. On one hand, we would like to keep mathematical properties such as monotonicity, group properties in the encoding space. On the other hand, it is impossible for us to always increase representation's size, so we should carefully inspect how much information we need to represent and accordingly choose a proper sequence length. As a result, many conventions/standards are proposed and established to construct an ordered encoding system. 

### **Three key pieces**
To wrap up, when representing a number with 0-1 sequences, three aspects must be considered. 
- Range. Given a fixed length of sequence, the number of 'everything' we can represent is also fixed. We must cherish each bit and carefully choose how many things we really want to represent.
- Overflow. What if something beyond the range unexpectedly appear? It is so-called _overflow_. But in fact, such overflowing things are always mapped into the space, result in a conflict and cause a chain effect.
- Conversion. It is unavoidable that more than one encoding rules are adopted due to so many thing we need to represent. How to convert a value under one rule to a value under another rule? In this sense, conversion is a composite function. In C/C++, this process is defined as _casting_. 

> buffer overflow vulnerabilities have accounted for many of the security holes in network and Internet servers.

### **Integers**
Above is the philosophy of the binary representation. Now we look further into specific representation of integers and take it as an example. C/C++ standards provide two different ways: one for nonnegative numbers (unsigned encodings), the other for negative, zero, and positive numbers (signed encodings).

Given a 0-1 sequence $B = x_{w-1}x_{w-2}...x_{1}x_{0}$, its corresponding value is $\sum_{i=0}^{w-1} x_i2^i$ in unsigned encodings. 
As a result, it forms a bijection. Every number between $0$ and $2^w − 1$ has a unique encoding as a $w$-bit value, while negative numbers are not included.

Therefore in signed encodings, we interpret the value as $-x_{w-1}2^{w-1} + \sum_{i=0}^{w-2} x_i2^i$. The different lies and only lies on the most significant bit (MSB). It is still a bijection, but the range now becomes $[-2^{w-1}, 2^{w-1} - 1]$. For nonnegative number x, its representation is the same for these two encodings with MSB as 0, while for negative number x, its representation will be interpreted as $2^w + x$, which is the complement of it with respect to $2^w$. It is exactly why we also call this encoding 
_Twos' complement encodings_.

It comes to us naturaly that whether there are other encodings to represent signed numbers. The answer is of course yes. Remember, we can interpret a sequence in any way. We can enfranchise one bit any meaning we want. For example, in so-called _Ones' comlement encodings_, MSB's weight is $-(2^{w-1} - 1)$ and the value is calculated as $-x_{w-1}(2^{w-1}-1) + \sum_{i=0}^{w-2} x_i2^i$. It has the range of $[-2^{w-1} - 1, 2^{w-1} - 1]$. Is it still a bijection? No, because zero can be represented as $000...000$ or $111...111$ in this way. 

You can learn more from CMU course 15-213 or its textbook CS:APP.