---
layout: post
show_date: true
title: "JavaScript introduction"
date: 2022-07-15
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

## Why JavasScript
JavaScript is a lightweight, interpreted programming language with object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.

It is not compiled but translated by the translator. This translator is embedded into the browser and is responsible for translating javascript code.

- Client side validation - This is really important to verify any user input before submitting it to the server and Javascript plays an important role in validting those inputs at front-end itself.

- Manipulating HTML Pages - Javascript helps in manipulating HTML page on the fly. This helps in adding and deleting any HTML tag very easily using javascript and modify your HTML to change its look and feel based on different devices and requirements.

- User Notifications - You can use Javascript to raise dynamic pop-ups on the webpages to give different types of notifications to your website visitors.

- Back-end Data Loading - Javascript provides Ajax library which helps in loading back-end data while you are doing some other processing. This really gives an amazing experience to your website visitors.

- Presentations - JavaScript also provides the facility of creating presentations which gives website look and feel. JavaScript provides RevealJS and BespokeJS libraries to build a web-based slide presentations.

- Server Applications - Node JS is built on Chrome's Javascript runtime for building fast and scalable network applications. This is an event based library which helps in developing very sophisticated server applications including Web Servers.


## Basics
JavaScript can be implemented using JavaScript statements that are placed within the 
```<script>... </script>``` HTML tags in a web page.

You can place the ```<script>``` tags, containing your JavaScript, anywhere within your web page, but it is normally recommended that you should keep it within the ```<head>``` tags.

The ```<script>``` tag alerts the browser program to start interpreting all the text between these tags as a script. A simple syntax of your JavaScript will appear as follows.

```html
<script ...>
   JavaScript code
</script>
```

The script tag takes two important attributes −

- Language − This attribute specifies what scripting language you are using. Typically, its value will be javascript. Although recent versions of HTML (and XHTML, its successor) have phased out the use of this attribute.

- Type − This attribute is what is now recommended to indicate the scripting language in use and its value should be set to "text/javascript".

So your JavaScript segment will look like −

```html
<script language = "javascript" type = "text/javascript">
   JavaScript code
</script>
```

## JavaScript Dom

JavaScript is an Object Oriented Programming (OOP) language. 

## JavaScript event

JavaScript's interaction with HTML is handled through events that occur when the user or the browser manipulates a page.

When the page loads, it is called an event. When the user clicks a button, that click too is an event. Other examples include events like pressing any key, closing a window, resizing a window, etc.

Developers can use these events to execute JavaScript coded responses, which cause buttons to close windows, messages to be displayed to users, data to be validated, and virtually any other type of response imaginable.

Events are a part of the Document Object Model (DOM) Level 3 and every HTML element contains a set of events which can trigger JavaScript Code.