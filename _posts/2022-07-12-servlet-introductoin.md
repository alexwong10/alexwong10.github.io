---
layout: post
show_date: true
title: "Java Servlet Introduction"
date: 2022-07-12
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "This tutorial is aimed to provide more details about java servlet, core interfaces in Java Servlet API, Servlet 3.0 annotations, life cycle of Servlet."
---

## Overview
Servlet is Java EE server driven technology to create web applications in java. The ```javax.servlet``` and ```javax.servlet.http``` packages provide interfaces and classes for writing our own servlets.

All servlets must implement the ```javax.servlet.Servlet``` interface, which defines servlet lifecycle methods. When implementing a generic service, we can extend the ```GenericServlet``` class provided with the Java Servlet API. The ```HttpServlet``` class provides methods, such as ```doGet()``` and ```doPost()```, for handling HTTP-specific services.

Most of the times, web applications are accessed using HTTP protocol and thats why we mostly extend ```HttpServlet``` class.

## Common Gateway Interfact (CGI) vs Serlet
Before introduction of Java Servlet API, CGI technology was used to create dynamic web applications. CGI technology has many drawbacks such as creating separate process for each request, platform dependent code (C, C++), high memory usage and slow performance.

Servlet was introduced to overcome these drawbacks.
- Servlets provide better performance that CGI in terms of processing time, memory utilization because servlets uses benefits of multithreading and for each request a new thread is created, that is faster than loading creating new Object for each request with CGI.
- Servlets and platform and system independent, the web application developed with Servlet can be run on any standard web container such as Tomcat, JBoss, Glassfish servers and on operating systems such as Windows, Linux, Unix, Solaris, Mac etc.
- Servlets are robust because container takes care of life cycle of servlet and we don’t need to worry about memory leaks, security, garbage collection etc.
- Servlets are maintainable and learning curve is small because all we need to take care is business logic for our application.

## Servlet API Hierarchy
The figure below shows servlet API hierachy.
<center><img src='./assets/img/posts/20220712/Servlet-API-Hierarchy.png'></center>

- ```javax.servlet.Servlet```
  - ```public abstract void init(ServletConfig paramServletConfig) throws ServletException``` – This is the very important method that is invoked by servlet container to initialized the servlet and ServletConfig parameters. It is called only once in servlet lifecycle and make Servlet class different from normal java objects. We can extend this method in our servlet classes to initialize resources such as DB Connection, Socket connection etc.
  - ```public abstract ServletConfig getServletConfig()``` – This method returns a servlet config object, which contains any initialization parameters and startup configuration for this servlet. We can use this method to get the init parameters of servlet defines in deployment descriptor (web.xml) or through annotation in Servlet 3. 
  - ```public abstract void service(ServletRequest req, ServletResponse res) throws ServletException, IOException``` – This method is responsible for processing the client request. Whenever servlet container receives any request, it creates a new thread and execute the service() method by passing request and response as argument. Servlets usually run in multi-threaded environment, so it’s developer responsibility to keep shared resources thread-safe using synchronization.
  - ```public abstract String getServletInfo()``` – This method returns string containing information about the servlet, such as its author, version, and copyright. The string returned should be plain text and can’t have markups.
  - ```public abstract void destroy()``` – This method can be called only once in servlet life cycle and used to close any open resources. This is like finalize method of a java class.
- ```javax.servlet.ServletConfig``` We can provide servlet init parameters in web.xml file or through use of WebInitParam annotation.
  - ```public abstract ServletContext getServletContext()``` – This method returns the ServletContext object for the servlet. 
  - ```public abstract Enumeration<String> getInitParameterNames()``` – This method returns the Enumeration\<String\> of name of init parameters defined for the servlet. If there are no init parameters defined, this method returns empty enumeration.
  - ```public abstract String getInitParameter(String paramString)``` – This method can be used to get the specific init parameter value by name. If parameter is not present with the name, it returns null.
- ```javax.servlet.ServletContext``` We provide access to web application variables to the servlet. Ideally the name of this interface should be ApplicationContext because it’s for the application and not specific to any servlet.
  - ```public abstract ServletContext getContext(String uripath)``` – This method returns ServletContext object for a particular uripath or null if not available or not visible to the servlet.
  - ```public abstract URL getResource(String path) throws MalformedURLException``` – This method return URL object allowing access to any content resource requested. We can access items whether they reside on the local file system, a remote file system, a database, or a remote network site without knowing the specific details of how to obtain the resources.
  - ```public abstract InputStream getResourceAsStream(String path)``` – This method returns an input stream to the given resource path or null if not found.
  - ```public abstract RequestDispatcher getRequestDispatcher(String urlpath)``` – This method is mostly used to obtain a reference to another servlet. After obtaining a RequestDispatcher, the servlet programmer forward a request to the target component or include content from it.
  - ```public abstract void log(String msg)``` – This method is used to write given message string to the servlet log file.
  - ```public abstract Object getAttribute(String name)``` – Return the object attribute for the given name. We can get enumeration of all the attributes using ```public abstract Enumeration<String> getAttributeNames() method```.
  - ```public abstract void setAttribute(String paramString, Object paramObject)``` – This method is used to set the attribute with application scope. The attribute will be accessible to all the other servlets having access to this ServletContext. We can remove an attribute using ```public abstract void removeAttribute(String paramString)``` method.
  - ```String getInitParameter(String name)``` – This method returns the String value for the init parameter defined with name in web.xml, returns null if parameter name doesn’t exist. We can use ```Enumeration<String> getInitParameterNames()``` to get enumeration of all the init parameter names.
  - ```boolean setInitParameter(String paramString1, String paramString2)``` – We can use this method to set init parameters to the application.
- ServletRequest: provide client request information to the servlet. Servlet container creates ServletRequest object from client request and pass it to the servlet service() method for processing.
  - ```Object getAttribute(String name)``` – This method returns the value of named attribute as Object and null if it’s not present. We can use ```getAttributeNames()``` method to get the enumeration of attribute names for the request. This interface also provide methods for setting and removing attributes.
  - ```String getParameter(String name)``` – This method returns the request parameter as String. We can use ```getParameterNames()``` method to get the enumeration of parameter names for the request.
  - ```String getServerName()``` – returns the hostname of the server.
  - ```int getServerPort()``` – returns the port number of the server on which it’s listening.
- ServletResponse: used by servlet in sending response to the client. Servlet container creates the ServletResponse object and pass it to servlet service() method and later use the response object to generate the HTML response for client.
  - ```void addCookie(Cookie cookie)``` – Used to add cookie to the response.
  - ```void addHeader(String name, String value)``` – used to add a response header with the given name and value.
  - ```String encodeURL(java.lang.String url)``` – encodes the specified URL by including the session ID in it, or, if encoding is not needed, returns the URL unchanged.
  - ```String getHeader(String name)``` – return the value for the specified header, or null if this header has not been set.
  - ```void sendRedirect(String location)``` – used to send a temporary redirect response to the client using the specified redirect location URL.
  - ```void setStatus(int sc)``` – used to set the status code for the response.
- RequestDispatcher
RequestDispatcher interface is used to forward the request to another resource that can be HTML, JSP or another servlet in the same context. We can also use this to include the content of another resource to the response. This interface is used for servlet communication within the same context. We can get RequestDispatcher in a servlet using ```ServletContext getRequestDispatcher(String path)``` method. The path must begin with a / and is interpreted as relative to the current context root.
  - ```void forward(ServletRequest request, ServletResponse response)``` – forwards the request from a servlet to another resource (servlet, JSP file, or HTML file) on the server.
  - ```void include(ServletRequest request, ServletResponse response)``` – includes the content of a resource (servlet, JSP page, HTML file) in the response.
- GenericServlet: 
GenericServlet is an abstract class that implements Servlet, ServletConfig and Serializable interface. GenericServlet provide default implementation of all the Servlet life cycle methods and ServletConfig methods and makes our life easier when we extend this class, we need to override only the methods we want and rest of them we can work with the default implementation. Most of the methods defined in this class are only for easy access to common methods defined in Servlet and ServletConfig interfaces.

One of the important method in GenericServlet class is no-argument init() method and we should override this method in our servlet program if we have to initialize some resources before processing any request from servlet.
- HTTPServlet: 
HTTPServlet is an abstract class that extends GenericServlet and provides the base for creating HTTP based web applications. There are methods defined to be overridden by subclasses for different HTTP methods.
  - doGet(), for HTTP GET requests
  - doPost(), for HTTP POST requests
  - doPut(), for HTTP PUT requests
  - doDelete(), for HTTP DELETE requests
  
## Other
### Servlet Attributes
Servlet attributes are used for inter-servlet communication, we can set, get and remove attributes in web application. There are three scopes for servlet attributes – request scope, session scope and application scope.

ServletRequest, HttpSession and ServletContext interfaces provide methods to get/set/remove attributes from request, session and application scope respectively.

Servlet attributes are different from init parameters defined in web.xml for ServletConfig or ServletContext.
### Annotations
- WebServlet – We can use this annotation with Servlet classes to define init parameters, loadOnStartup value, description and url patterns etc. At least one URL pattern MUST be declared in either the value or urlPattern attribute of the annotation, but not both. The class on which this annotation is declared MUST extend HttpServlet.
- WebInitParam – This annotation is used to define init parameters for servlet or filter, it contains name, value pair and we can provide description also. This annotation can be used within a WebFilter or WebServlet annotation.
- WebFilter – This annotation is used to declare a servlet filter. This annotation is processed by the container during deployment, the Filter class in which it is found will be created as per the configuration and applied to the URL patterns, Servlets and DispatcherTypes. The annotated class MUST implement javax.servlet.Filter interface.
- WebListener – The annotation used to declare a listener for various types of event, in a given web application context.
