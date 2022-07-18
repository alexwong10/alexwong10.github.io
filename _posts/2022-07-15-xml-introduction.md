---
layout: post
show_date: true
title: "XML introduction"
date: 2022-07-15
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

## Overview
XML stands for Extensible Markup Language. It is a text-based markup language derived from Standard Generalized Markup Language (SGML).

XML tags identify the data and are used to store and organize the data, rather than specifying how to display it like HTML tags, which are used to display the data. XML is not going to replace HTML in the near future, but it introduces new possibilities by adopting many successful features of HTML.

## Syntax

```xml
<?xml version = "1.0"?>
<contact-info>
   <name>Tanmay Patil</name>
   <company>TutorialsPoint</company>
   <phone>(011) 123-4567</phone>
</contact-info>
```

### declaration
### tags and elements
### attributes
### references
### text

## DOM and XML Parsing
The **D**ocument **O**bject **M**odel (DOM) is the foundation of XML. XML documents have a hierarchy of informational units called nodes; DOM is a way of describing those nodes and the relationships between them.

A DOM document is a collection of nodes or pieces of information organized in a hierarchy. This hierarchy allows a developer to navigate through the tree looking for specific information. Because it is based on a hierarchy of information, the DOM is said to be tree based.

## DTD
The XML **D**ocument **T**ype **D**eclaration, commonly known as DTD, is a way to describe XML language precisely. DTDs check vocabulary and validity of the structure of XML documents against grammatical rules of appropriate XML language.

An XML DTD can be either specified inside the document, or it can be kept in a separate document and then liked separately.

### Syntax
```
<!ElEMENT>
<!ATTLIST>
```

### Internal
```
<!DOCTYPE root-element [element-declarations]>
```

### External
```
<!DOCTYPE root-element SYSTEM "file-name">
```


## Schemas
XML Schema is commonly known as XML Schema Definition (XSD). It is used to describe and validate the structure and the content of XML data. XML schema defines the elements, attributes and data types. Schema element supports Namespaces. It is similar to a database schema that describes the data in a database.



