---
layout: post
show_date: true
title: "Maven Introduction"
date: 2022-07-13
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "Apache Maven is a software project management and comprehension tool based on the concept of a project object model (POM).
This article introduce how maven helps us in  project's build, reporting and documentation."
---

>TL;DR: 

## Overview
Maven began as an attempt to simplify the build processes in the Jakarta Turbine project. There were several projects, each with their own ```Ant``` build files, that were all slightly different. JARs were checked into CVS. We wanted a standard way to build the projects, a clear definition of what the project consisted of, an easy way to publish project information, and a way to share JARs across several projects.

>```Ant``` is a Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other.

The result is a tool that can now be used for building and managing any Java-based project. We hope that we have created something that will make the day-to-day work of Java developers easier and generally help with the comprehension of any Java-based project.

Maven's primary goal is to allow a developer to comprehend the complete state of a development effort in the shortest period of time. In order to attain this goal, Maven deals with several areas of concern:

- Making the build process easy
- Providing a uniform build system
- Providing quality project information
- Encouraging better development practices

## Project Object Model (POM)
POM is fundamental unit of work in Maven. It is an XML file that resides in the base directory of the project as ```pom.xml```.

The POM contains information about the project and various configuration detail used by Maven to build the project(s).

Configurations that can be specified in the POM include: project dependencies, plugins, goals, build profiles, project version, developers
mailing list.

Before creating a POM, we should first decide the project group (**groupId**), its name (**artifactId**) and its **version** as these attributes help in uniquely identifying the project in repository. As a result, project notation in repository is ```groupId:artifactId:version```.

```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>

   <groupId>com.companyname.project-group</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>
</project>
```

## Life Cycle