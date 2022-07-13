---
layout: post
show_date: true
title: "Java Web Application"
date: 2022-07-12
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "Java Web Application is used to create dynamic websites. Java provides support for web application through Servlets and JSPs. We can create a website with static HTML pages but when we want information to be dynamic, we need web application."
---

>TL;DR: 

Java Web Application is used to create dynamic websites. Java provides support for web application through Servlets and JSPs. We can create a website with static HTML pages but when we want information to be dynamic, we need web application.

## Basics
### Web Server and Client
Web server is a software that can process the client request and send the response back to the client.

Web client is a software that helps in communicating with the server.
### HTML and HTTP
### URL
URL (Universal Resource Locator) is used to locate the server and resource. 
An example like:
```
https://localhost:8080/FirstServletProject/jsps/hello.jsp
```

## Why Servlet and JSPs?
Web servers don't know how to generate dynamic content or how to save data into databases.

Java Servlets and JSPs are server-side technologies to extend the capability of web servers by providing support for dynamic response and data persistence.

## Web container
When web container gets the request and if it’s for servlet then container creates two Objects HTTPServletRequest and HTTPServletResponse. Then it finds the correct servlet based on the URL and creates a thread for the request. Then it invokes the servlet service() method and based on the HTTP method service() method invokes doGet() or doPost() methods. Servlet methods generate the dynamic page and write it to the response. Once servlet thread is complete, the container converts the response to HTTP response and send it back to the client.

Work done by web containers:
- **Communication support** provides easy way of communication between web server and the servlets and JSPs. 
- **Lifecycle and Resource Management** takes care of loading the servlets into memory, initializing servlets, invoking servlet methods and destroying them.
- **Multithreading Support** creates a new thread for every request to the servlet and when it's processed the thread dies.
- **JSP Support** Every JSP in the application is compiled by container and converted to servlet, and managed like other servlets.
- **Miscellaneous Task**

## Web Application Directory Structure

<center><img src='./assets/img/posts/20220712/WAR-directory-structure.png'></center>