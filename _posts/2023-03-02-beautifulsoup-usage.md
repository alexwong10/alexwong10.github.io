---
layout: post
show_date: true
title: "BeautifulSoup的快速入门"
date: 2023-03-02
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---



In web development, "tag soup" is a pejorative for syntactically or structurally incorrect HTML written for a web page. To solve the "tag soup" problem, many HTML parsers have been developed. Among them, BeautifulSoup is
one of the most effective and popular parsers in Python.

Named after a _Lewis Carroll_ poem of the same name in _Alice’s Adventures in the Wonderland_, BeautifulSoup already has a helpful documentation in its official site[^1], with lots of codes use text from _Alice’s Adventures in the Wonderland_ as an example.

[^1]: https://www.crummy.com/software/BeautifulSoup/bs4/doc/

In this blog, I would like to introduce the basic usage of BeautifulSoup, along with some problems I met during utilizing it to parse XML file in my experiment and my own understanding.

> Beautiful soup so rich and green
> 
> Waiting in a hot tureen
> 
> Who for such dainties would not stoop?

# Core concepts
## Markup Language
>Markup language is a text-encoding system consisting of a set of symbols inserted in a text document to control its structure, formatting, or the relationship between its parts.[^2]

[^2]: https://en.wikipedia.org/wiki/Markup_language

Compared to genderal lanuages, markup is often used to structurally control the display of the document or enrich its content. Tex, Latex, Markdown are older markup languages while HTML(Hypertext Markup Language) and XML(Extensible Markup Language) are more modern ones. 

```BeautifulSoup``` is for pulling data out of HTML and XML files, which are two widely used markup languages.

## Parser
Different markup languages have different markup rules. For those not familiar with them, markups are terrible mess. But sometimes, we need to extract contents from them. For example, it is common for programmers to find out what a web page contains in web scraping. We call this process as parse. Parsers help us do it even if we don't know much about markup language rules. 

There are five kinds of parsers supported by ```BeautifulSoup```, including Python’s standard ```html.parser```, ```lxml```'s parser for HTML and XML, and ```html5lib``` 

## Encoding
As indicated in Markup language's definition, we have to decode text when we parse it. While parsers help us to understand markup symbol's meaning, how to explain different characters into a special or unique format. It is what we call character encoding system. 

Typical encoding systems include UTF-8 and ASCII. For Chinese users, they must know GB2312 or GB18030

```BeautifulSoup``` also supports us to handle this problem by pass corresponding arguments to it.

# Preparation
It is easy to install BeautifulSoup. Just ```pip install beautifulsoup4```. Note that it is not ```BeautifulSoup``` package, which is older version of it.

Besides, we need to install corresponding third-party parsers if we need. Take ```lxml``` as an example, it can be installed with ```pip install lxml```

# Key Usage
Now we can begin to use ```BeautifulSoup``` to play with HTML and XML.

Import the pacakge we need. 
```
from bs4 import BeautifulSoup
``` 

# Problems I meet