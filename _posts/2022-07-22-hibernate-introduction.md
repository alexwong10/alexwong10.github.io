---
layout: post
show_date: true
title: "Hibernate introduction"
date: 2022-07-22
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

## Why Hibernate?

Hibernate is a high-performance Object/Relational persistence and query service. It is an Object-Relational Mapping (ORM) solution for JAVA. Hibernate not only takes care of the mapping from Java classes to database tables (and from Java data types to SQL data types), but also provides data query and retrieval facilities.

>ORM: Object-Relational Mapping (ORM) is a programming technique for converting data between relational databases and object oriented programming languages.

Hibernate sits between traditional Java objects and database server to handle all the works in persisting those objects based on the appropriate O/R mechanisms and patterns.

Here are some Hibernate's advantages.

- Takes care of mapping Java classes to database tables using XML files and without writing any line of code.

- Provides simple APIs for storing and retrieving Java objects directly to and from the database.

- If there is change in the database or in any table, then you need to change the XML file properties only.

- Abstracts away the unfamiliar SQL types and provides a way to work around familiar Java Objects.

- Does not require an application server to operate.

- Manipulates Complex associations of objects of your database.

- Minimizes database access with smart fetching strategies.

- Provides simple querying of data.


## Architecture


