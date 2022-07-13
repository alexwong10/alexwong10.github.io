---
layout: post
show_date: true
title: "Session Filter in Java"
date: 2022-07-12
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "Learn about Servlet Filter and how we can use it to intercept request and response objects and manipulate them in between. The article explains about Filter interface, WebFilter annotation, Servlet Filters configuration in web.xml. We will look into various usage of servlet filter, how can we create a filter and learn its usage with a simple web application."
---

## Why filter?
If we want to make sure that a resource is accessible only when the user session is valid, we can achieve this using servlet session attributes. The approach is simple but if we have a lot of servlets and jsps, then it will become hard to maintain because of redundant code. If we want to change the attribute name in the future, we will have to change all the places where we have session authentication.

Servlet Filters are **pluggable** java components. Servlets and filters both are unaware of each other and we can add or remove a servlet filter just by editing web.xml. We can use filters to intercept and process requests before they are sent to servlets and response after servlet code is finished and before container sends the response back to the client. 

Here are some common tasks that we can do with servlet filters:
- Logging request parameters to log files
- Authentication and autherization of request for resources
- Formatting of request body or header before sending it to servlet
- Compressing the response data sent to the client
- Alter response by adding some cookies, header information etc.

## Servlet Filter interface
Servlet Filter interface is similar to Servlet interface and we need to implement it to create our own servlet filter. Servlet Filter interface contains lifecycle methods of a Filter and it’s managed by servlet container.
- void init(FilterConfig paramFilterConfig) – When container initializes the Filter, this is the method that gets invoked. This method is called only once in the lifecycle of filter and we should initialize any resources in this method. FilterConfig is used by container to provide init parameters and servlet context object to the Filter. We can throw ServletException in this method.
- doFilter(ServletRequest paramServletRequest, ServletResponse paramServletResponse, FilterChain paramFilterChain) – This is the method invoked every time by container when it has to apply filter to a resource. Container provides request and response object references to filter as argument. FilterChain is used to invoke the next filter in the chain.
- void destroy() – When container offloads the Filter instance, it invokes the destroy() method. This is the method where we can close any resources opened by filter. This method is called only once in the lifetime of filter.

## Servlet WebFilter annotation
```javax.servlet.annotation.WebFilter``` was introduced in Servlet 3.0 and we can use this annotation to declare a servlet filter. We can use this annotation to define init parameters, filter name and description, servlets, url patterns and dispatcher types to apply the filter. If you make frequent changes to the filter configurations, its better to use web.xml because that will not require you to recompile the filter class.

## Servlet Filter configuration in web.xml
```
<filter>
  <filter-name>RequestLoggingFilter</filter-name> <!-- mandatory -->
  <filter-class>com.journaldev.servlet.filters.RequestLoggingFilter</filter-class> <!-- mandatory -->
  <init-param> <!-- optional -->
  <param-name>test</param-name>
  <param-value>testValue</param-value>
  </init-param>
</filter>
```