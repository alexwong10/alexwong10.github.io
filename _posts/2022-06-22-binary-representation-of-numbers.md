---
layout: post
show_date: true
title: "Binary Representation of Numbers in Computer Science"
date: 2022-06-22
categories: computer science
img: posts/20220620/zero-one.png
tags: [15-213]
author: cheungwong
Description: "How infinite numbers are represented under limitation of finite bits? In this blog, we focus on representations of integers and floating point numbers."
---


### Integers
Above is the philosophy of the binary representation. Now we look further into specific representation of integers. C/C++ standards provide two different ways: one for nonnegative numbers (unsigned encodings), the other for negative, zero, and positive numbers (signed encodings).

Given a 0-1 sequence $B = x_{w-1}x_{w-2}...x_{1}x_{0}$, its corresponding value is $\sum_{i=0}^{w-1} x_i2^i$ in unsigned encodings. 
As a result, it forms a bijection. Every number between $0$ and $2^w − 1$ has a unique encoding as a $w$-bit value, while negative numbers are not included.

Therefore in signed encodings, we interpret the value as $-x_{w-1}2^{w-1} + \sum_{i=0}^{w-2} x_i2^i$. The different lies and only lies on the most significant bit (MSB). It is still a bijection, but the range now becomes $[-2^{w-1}, 2^{w-1} - 1]$. For nonnegative number x, its representation is the same for these two encodings with MSB as 0, while for negative number x, its representation will be interpreted as $2^w + x$, which is the complement of it with respect to $2^w$. It is exactly why we also call this encoding 
_Twos' complement encodings_.

It comes to us naturaly that whether there are other encodings to represent signed numbers. The answer is of course yes. Remember, we can interpret a sequence in any way. We can enfranchise one bit any meaning we want. For example, in so-called _Ones' comlement encodings_, MSB's weight is $-(2^{w-1} - 1)$ and the value is calculated as $-x_{w-1}(2^{w-1}-1) + \sum_{i=0}^{w-2} x_i2^i$. It has the range of $[-2^{w-1} - 1, 2^{w-1} - 1]$. Is it still a bijection? No, because zero can be represented as $000...000$ or $111...111$ in this way. 



### Floating point Numbers
Floating point numbers are more difficult to represent. 

You can learn more from CMU course 15-213 or its textbook CS:APP.