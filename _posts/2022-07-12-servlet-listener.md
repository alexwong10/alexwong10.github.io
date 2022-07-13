---
layout: post
show_date: true
title: "Session Listener in Java"
date: 2022-07-12
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "We will look into servlet listener, benefits of servlet listeners, some common tasks that we can do with listeners, servlet API listener interfaces and Event objects. "
---

## Why Listener?
We know that using ServletContext, we can create an attribute with application scope that all other servlets can access. 

But we can initialize ServletContext init parameters as String only in deployment descriptor (web.xml). What if our application is database oriented and we want to set an attribute in ServletContext for Database Connection. Also if database is down or not configured properly, we won’t know until first client request comes to server. 

To handle these scenario, servlet API provides Listener interfaces that we can implement and configure to listen to an event and do certain operations.

>Event is occurrence of something, in web application world. An event can be initialization of application, destroying an application, request from client, creating/destroying a session, attribute modification in session etc.

### Servlet API
Servlet API provides different kind of listeners for different types of Events. Listener interfaces declare methods to work with a group of similar events. Every method in listener interface takes Event objects as input. Event objects works as a wrapper to provide specific object to the listeners.

- Event Objects
  - ```javax.servlet.AsyncEvent``` – Event that gets fired when the asynchronous operation initiated on a ServletRequest (via a call to ServletRequest#startAsync or ServletRequest#startAsync(ServletRequest, ServletResponse)) has completed, timed out, or produced an error.
  - ```javax.servlet.http.HttpSessionBindingEvent``` – Events of this type are either sent to an object that implements ```HttpSessionBindingListener``` when it is bound or unbound from a session, or to a ```HttpSessionAttributeListener``` that has been configured in the ```web.xml``` when any attribute is bound, unbound or replaced in a session.
    The session binds the object by a call to ```HttpSession.setAttribute``` and unbinds the object by a call to ```HttpSession.removeAttribute```.
    We can use this event for cleanup activities when object is removed from session.
  - ```javax.servlet.http.HttpSessionEvent``` – This is the class representing event notifications for changes to sessions within a web application.
  - ```javax.servlet.ServletContextAttributeEvent``` – Event class for notifications about changes to the attributes of the ```ServletContext``` of a web application.
  - ```javax.servlet.ServletContextEvent``` – This is the event class for notifications about changes to the servlet context of a web application.
  - ```javax.servlet.ServletRequestEvent``` – Events of this kind indicate lifecycle events for a ServletRequest. The source of the event is the ServletContext of this web application.
  - ```javax.servlet.ServletRequestAttributeEvent``` – This is the event class for notifications of changes to the attributes of the servlet request in an application.
- Listner Interfaces
  - ```javax.servlet.AsyncListener``` – Listener that will be notified in the event that an asynchronous operation initiated on a ServletRequest to which the listener had been added has completed, timed out, or resulted in an error.
  - ```javax.servlet.ServletContextListener``` – Interface for receiving notification events about ```ServletContext``` lifecycle changes.
  - ```javax.servlet.ServletContextAttributeListener``` – Interface for receiving notification events about ServletContext attribute changes.
  - ```javax.servlet.ServletRequestListener``` – Interface for receiving notification events about requests coming into and going out of scope of a web application.
  - ```javax.servlet.ServletRequestAttributeListener``` – Interface for receiving notification events about ServletRequest attribute changes.
  - ```javax.servlet.http.HttpSessionListener``` – Interface for receiving notification events about HttpSession lifecycle changes.
  - ```javax.servlet.http.HttpSessionBindingListener``` – Causes an object to be notified when it is bound to or unbound from a session.
  - ```javax.servlet.http.HttpSessionAttributeListener``` – Interface for receiving notification events about HttpSession attribute changes.
  - ```javax.servlet.http.HttpSessionActivationListener``` – Objects that are bound to a session may listen to container events notifying them that sessions will be passivated and that session will be activated. A container that migrates session between VMs or persists sessions is required to notify all attributes bound to sessions implementing ```HttpSessionActivationListener```.

## Servlet Listener Configuration
We can use @WebListener annotation to declare a class as Listener, however the class should implement one or more of the Listener interfaces.

```
<listener>
    <listener-class>
    com.journaldev.listener.AppContextListener
    </listener-class>
</listener>
```

