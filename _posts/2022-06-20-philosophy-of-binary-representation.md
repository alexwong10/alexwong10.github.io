---
layout: post
title: "Philosophy of binary representation: finite bits vs. infinite information"
date: 2022-06-20
tags: [Computer Science]
excerpt: "TL;DR: Bits are not everything. Everything can be bits."
mathjax: true
lang: en
---

## TL;DR: Bits are not everything. Everything can be bits. 
It is widely known that data are encoded as sequences of 0s and 1s in computer science because of how electronic computers are implemented. But what is the philosophy behind this? In my opinion, this representation is a typical example of the ubiquitous tension between finiteness and infinity in computer science.
> All information in a system—including disk files, programs stored in memory, user data stored in memory, and data transferred across a network—is represented as a bunch of bits. The only thing that distinguishes different data objects is the context in which we view them. 

### **Bit: binary unit**
The bit is the most important unit of information in computing and digital communications. Its values are most commonly represented as either 1 or 0, although we can also use any binary distinction, such as _true/false_ or _yes/no_. The key is that a bit is **binary**, which means it can represent only a limited number of possibilities. A fixed-size binary representation can be seen as a 0-1 sequence of fixed length. We denote the length as $w$. Then the size of the encoding space is no more than $2^w$. Therefore, it can never represent everything. This is why `int` values are not the same as mathematical integers, and `double` values are not the same as mathematical real numbers.

Still, we say everything can be bits because we can always find a way to encode its information into corresponding bits. If the encoding space is not large enough, we can simply increase the sequence length and add more bits. Even infinity can be represented in a clever way. For example, in the IEEE 754-1985 standard for floating-point arithmetic, positive infinity in single precision is represented by the bit pattern ```0x7F800000```.

### **Systematic encoding matters**
However, random encoding would doom the binary world to chaos. At the very least, we do not want representation conflicts, which are unavoidable if everyone encodes things in whatever way they like and there is no unified code. Therefore, encodings are generally bijections—that is, one-to-one mappings—and are commonly accepted as standards.

Meanwhile, many subtler issues are worth considering. Take the binary representation of numbers, for example. On the one hand, we would like to preserve mathematical properties such as monotonicity and group structure in the encoding space. On the other hand, it is impossible to increase the representation size indefinitely, so we should carefully assess how much information we need to represent and choose an appropriate sequence length accordingly. As a result, many conventions and standards have been proposed and established to construct ordered encoding systems.

### **Three key pieces**
To wrap up, when representing a number with 0-1 sequences, three aspects must be considered. 
- Range. Given a fixed sequence length, the number of distinct values we can represent is fixed. We must cherish each bit and carefully choose how many values we really want to represent.
- Overflow. What if a value beyond the range appears unexpectedly? This is called _overflow_. In practice, such values may be mapped back into the representable space, resulting in a conflict and causing cascading effects.
- Conversion. It is unavoidable that more than one encoding rule is adopted because we need to represent so many things. How do we convert a value under one rule to a value under another? In this sense, conversion is a composite function. In C/C++, this process is called _casting_.

> buffer overflow vulnerabilities have accounted for many of the security holes in network and Internet servers.

### **Integers**
That is the philosophy of binary representation. Now let us look more closely at the representation of integers as an example. C/C++ standards provide two common schemes: one for nonnegative numbers (unsigned encoding) and the other for negative, zero, and positive numbers (signed encoding).

Given a 0-1 sequence $B = x_{w-1}x_{w-2}...x_{1}x_{0}$, its corresponding value is $\sum_{i=0}^{w-1} x_i2^i$ in unsigned encodings. 
As a result, it forms a bijection. Every number between $0$ and $2^w − 1$ has a unique encoding as a $w$-bit value, while negative numbers are not included.

Therefore in signed encodings, we interpret the value as $-x_{w-1}2^{w-1} + \sum_{i=0}^{w-2} x_i2^i$. The difference lies entirely in the most significant bit (MSB). It is still a bijection, but the range now becomes $[-2^{w-1}, 2^{w-1} - 1]$. For a nonnegative number $x$, its representation is the same in both encodings when the MSB is 0. For a negative number $x$, its representation is interpreted as $2^w + x$, which is the complement of $x$ with respect to $2^w$. This is why we also call this scheme
_two's-complement encoding_.

It is natural to ask whether there are other encodings for signed numbers. The answer is, of course, yes. Remember, we can interpret a sequence in any way. We can assign any meaning we want to a bit. For example, in so-called _one's-complement encoding_, the MSB's weight is $-(2^{w-1} - 1)$ and the value is calculated as $-x_{w-1}(2^{w-1}-1) + \sum_{i=0}^{w-2} x_i2^i$. It has the range $[-(2^{w-1} - 1), 2^{w-1} - 1]$. Is it still a bijection? No, because zero can be represented as $000...000$ or $111...111$ in this scheme.

You can learn more from CMU's 15-213 course or the CS:APP textbook.
