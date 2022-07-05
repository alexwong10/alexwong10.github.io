---
layout: post
show_date: true
title: "Could not resolve host on CentOS7"
date: 2022-07-05
categories: coding
img:
tags: [tutorial, error]
author: cheungwong
Description: "First day work of my internship."
---

>TL;DR: config network card file

I met this problem when I installed minimal version of CentOS 7.9 on virtualbox. It results from the default minimal setting which turns off the network card service. Therefore, we just need to reconfig the network card setting.

```
# check network card info
ip addr

# check corresponding network card file
cd /etc/sysconfig/network-scripts/

# modify network card file, change ONBOOT=no to ONBOOT=yes
sudo vi [NETWORK CARD FILE]

# restart network service
service network restart 
```
