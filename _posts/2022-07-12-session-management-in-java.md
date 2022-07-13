---
layout: post
show_date: true
title: "Session Management in Java"
date: 2022-07-12
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "This article explains about Session and different ways of session management. We learn how we can use Cookies and Servlet API HttpSession interface to maintain user session. We also learn how to use URL rewriting techniques for session management when cookies are disable at client side."
---

## What is a Session?
HTTP protocol and Web Servers are stateless, what it means is that for web server every request is a new request to process and they can’t identify if it’s coming from client that has been sending request previously.

**Session** is a conversional state between client and server and it can consist of multiple request and response between client and server. Unique information about the session (session id) is passed between server and client in every request and response.

There are several ways through which we can provide unique identifier in request and response.

- **User Authentication** – This is the very common way where we user can provide authentication credentials from the login page and then we can pass the authentication information between server and client to maintain the session. This is not very effective method because it wont work if the same user is logged in from different browsers.
- **HTML Hidden Field** – We can create a unique hidden field in the HTML and when user starts navigating, we can set its value unique to the user and keep track of the session. This method can’t be used with links because it needs the form to be submitted every time request is made from client to server with the hidden field. Also it’s not secure because we can get the hidden field value from the HTML source and use it to hack the session.
- **URL Rewriting** – We can append a session identifier parameter with every request and response to keep track of the session. This is very tedious because we need to keep track of this parameter in every response and make sure it’s not clashing with other parameters.
- **Cookies** – Cookies are small piece of information that is sent by web server in response header and gets stored in the browser cookies. When client make further request, it adds the cookie to the request header and we can utilize it to keep track of the session. We can maintain a session with cookies but if the client disables the cookies, then it won’t work.

However, most of the time, we have to store some data into the session for future use besides track the session. All of these methods are also not complete and easy to fail in a particular scenario. We need a solution that can utilize these methods of sssion tracking to provide session management in all cases. Session Management API is built on top of above methods and helps a lot. 

## Session Management in Java - Cookies
## Session in Java Servlet - HttpSession
## Session Management in Java Servlet - URL Rewriting
