---
layout: post
show_date: true
title: "Spring boot loader introduction"
date: 2022-07-11
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: 
---

目的：允许嵌套jar。提供三种类启动器JarLauncher, WarLauncher, PropertiesLauncher
```
archive.jar
 |
 +-META-INF（1）
 |  +-MANIFEST.MF
 +-org（2）Spring boot loader本身需要的类放置处
 |  +-springframework
 |     +-boot
 |        +-loader
 |           +-<spring boot loader classes>
 +-com（3）应用本身的文件放置处
 |  +-mycompany
 |     + project
 |        +-YouClasses.class
 +-lib（4）应用依赖的jar目录
    +-dependency1.jar
    +-dependency2.jar
```

加载过程：
