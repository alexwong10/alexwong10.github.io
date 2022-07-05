---
layout: post
show_date: true
title: "xxx is not in the sudoers list"
date: 2022-07-05
categories: coding
img:
tags: [tutorial, error]
author: cheungwong
Description: "First day work of my internship."
---

>TL;DR: Add desired user to the sudoers group.

```
# switch to root
su - root
# add your name to group wheel, which is exactly sudoers group
usermod -aG wheel [USERNAME]
```