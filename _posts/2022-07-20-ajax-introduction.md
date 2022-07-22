---
layout: post
show_date: true
title: "AJAX introduction"
date: 2022-07-20
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

## Why AJAX
AJAX stands for **A**synchronous **J**avaScript **a**nd **X**ML. AJAX is a new technique for creating better, faster, and more interactive web applications with the help of XML, HTML, CSS, and Java Script.

In a nutshell, it is the use of the XMLHttpRequest object to communicate with servers. It can send and receive information in various formats, including JSON, XML, HTML, and text files. AJAX's most appealing characteristic is its "asynchronous" nature, which means it can communicate with the server, exchange data, and update the page without having to refresh the page.

The two major features of AJAX allow you to do the following:
- Make requests to the server without reloading the page
- Receive and work with data from the server

## Steps
Here is a clearer picture of the exact steps of AJAX operation.
Steps of AJAX Operation.
- A client event occurs. A JavaS
- An XMLHttpRequest object is created.
- The XMLHttpRequest object is configured.
- The XMLHttpRequest object makes an asynchronous request to the Webserver.
- The Webserver returns the result containing XML document.
- The XMLHttpRequest object calls the callback() function and processes the result.
- The HTML DOM is updated.


## XMLHttpRequest
XMLHttpRequest (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing.

Despite its name, XMLHttpRequest can be used to retrieve any type of data, not just XML.

