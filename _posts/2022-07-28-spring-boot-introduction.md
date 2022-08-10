---
layout: post
show_date: true
title: "Spring boot introduction"
date: 2022-07-28
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

Spring Boot is an open source Java-based framework used to create a Micro Service. It is developed by Pivotal Team. It is easy to create a stand-alone and production ready spring applications using Spring Boot. Spring Boot contains a comprehensive infrastructure support for developing a micro service and enables you to develop enterprise-ready applications that you can “just run”.

>Micro Service is an architecture that allows the developers to develop and deploy services independently. Each service running has its own process and this achieves the lightweight model to support business applications.

## Why Spring Boot?
You can choose Spring Boot because of the features and benefits it offers as given here.
- It provides a flexible way to configure Java Beans, XML configurations, and Database Transactions.
- It provides a powerful batch processing and manages REST endpoints.
- In Spring Boot, everything is auto configured; no manual configurations are needed.
- It offers annotation-based spring application
- Eases dependency management
- It includes Embedded Servlet Container

## How does it work?
Spring Boot automatically configures your application based on the dependencies you have added to the project by using ```@EnableAutoConfiguration``` annotation. For example, if MySQL database is on your classpath, but you have not configured any database connection, then Spring Boot auto-configures an in-memory database.

The entry point of the spring boot application is the class contains ```@SpringBootApplication``` annotation and the main method.

Spring Boot automatically scans all the components included in the project by using ```@ComponentScan``` annotation.

### Spring Boot Starters
All Spring Boot starters follow the same naming pattern **spring-boot-starter- \***, where * indicates that it is a type of the application.

For example, Spring Boot Starter web dependency is used to write a Rest Endpoints. Its code is shown below −
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### Auto Configuration
Spring Boot Auto Configuration automatically configures your Spring application based on the JAR dependencies you added in the project. For example, if MySQL database is on your class path, but you have not configured any database connection, then Spring Boot auto configures an in-memory database.

For this purpose, you need to add ```@EnableAutoConfiguration``` annotation or ```@SpringBootApplication``` annotation to your main class file. Then, your Spring Boot application will be automatically configured.

Observe the following code for a better understanding −
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@EnableAutoConfiguration
public class DemoApplication {
   public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
   }
}
```

### Spring Boot Application

The entry point of the Spring Boot Application is the class contains ```@SpringBootApplication``` annotation. This class should have the main method to run the Spring Boot application. ```@SpringBootApplication``` annotation includes Auto Configuration, Component Scan, and Spring Boot Configuration.

If you added ```@SpringBootApplication``` annotation to the class, you do not need to add the ```@EnableAutoConfiguration```, ```@ComponentScan``` and ```@SpringBootConfiguration``` annotation. The @SpringBootApplication annotation includes all other annotations.

Observe the following code for a better understanding −
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
   public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
   }
}
```

### Component Scan

Spring Boot application scans all the beans and package declarations when the application initializes. You need to add the ```@ComponentScan``` annotation for your class file to scan your components added in your project.

Observe the following code for a better understanding.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
public class DemoApplication {
   public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
   }
}
```


