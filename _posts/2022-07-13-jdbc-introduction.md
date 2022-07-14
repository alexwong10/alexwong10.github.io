---
layout: post
show_date: true
title: "JDBC introduction"
date: 2022-07-13
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: "This article explains about JDBC. The JDBC library includes APIs for making a connection to a database, creating SQL or MySQL statements, executing SQL or MySQL queries in the database and viewing & Modifying the resulting records.
"
---

## What is JDBC?
JDBC stands for Java Database Connectivity, which is a standard Java API for database-independent connectivity between the Java programming language and a wide range of databases.

The JDBC API supports both two-tier and three-tier processing models for database access but in general, JDBC Architecture consists of two layers −

- JDBC API − This provides the application-to-JDBC Manager connection. The JDBC API uses a driver manager and database-specific drivers to provide transparent connectivity to heterogeneous databases.
The JDBC driver manager ensures that the correct driver is used to access each data source. The driver manager is capable of supporting multiple concurrent drivers connected to multiple heterogeneous databases.
- JDBC Driver API − This supports the JDBC Manager-to-Driver Connection. 

The JDBC API provides the following interfaces and classes.

    DriverManager − This class manages a list of database drivers. Matches connection requests from the java application with the proper database driver using communication sub protocol. The first driver that recognizes a certain subprotocol under JDBC will be used to establish a database Connection.

    Driver − This interface handles the communications with the database server. You will interact directly with Driver objects very rarely. Instead, you use DriverManager objects, which manages objects of this type. It also abstracts the details associated with working with Driver objects.

    Connection − This interface with all methods for contacting a database. The connection object represents communication context, i.e., all communication with database is through connection object only.

    Statement − You use objects created from this interface to submit the SQL statements to the database. Some derived interfaces accept parameters in addition to executing stored procedures.

    ResultSet − These objects hold data retrieved from a database after you execute an SQL query using Statement objects. It acts as an iterator to allow you to move through its data.

    SQLException − This class handles any errors that occur in a database application.

The ```java.sql``` and ```javax.sql``` are the primary packages for JDBC 4.0.

## Steps to connect JDBC
There are basically seven steps to get your java application connected to deal with the database. 

1. Import the required package for the corresponding database.
2. Load and register the JDBC drivers.
3. Establish the connection
4. Create a statement
5. Execute the query
6. Process the results
7. Close the connections

```java
import java.sql.*;

public class FirstExample {
   static final String DB_URL = "jdbc:mysql://localhost/TUTORIALSPOINT";
   static final String USER = "guest";
   static final String PASS = "guest123";
   static final String QUERY = "SELECT id, first, last, age FROM Employees";

   public static void main(String[] args) {
      // Open a connection
      try(Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(QUERY);) {
         // Extract data from result set
         while (rs.next()) {
            // Retrieve by column name
            System.out.print("ID: " + rs.getInt("id"));
            System.out.print(", Age: " + rs.getInt("age"));
            System.out.print(", First: " + rs.getString("first"));
            System.out.println(", Last: " + rs.getString("last"));
         }
      } catch (SQLException e) {
         e.printStackTrace();
      } 
   }
}
```

## JDBC Driver
JDBC driver implements the defined interfaces for interacting with your database server.

For example, it enables you to open database connections and to interact with it by sending SQL or database commands then receiving results with Java.

The ```Java.sql``` package that ships with JDK, contains various classes with their behaviours defined and their actual implementaions are done in third-party drivers. Third party vendors implements the ```java.sql.Driver``` interface in their database driver.

Sun divided implementatin types into four types
- JDBC-ODBC Bridge Driver
- JDBC-Native API
- JDBC-Net pure Java
- 100% Pure Java

## Connections
There are two ways to **explicitly** register a driver.
- Class.forName()
- DriverManager.registerDriver()

## Statements
Once a connection is obtained we can interact with the database. The JDBC Statement, CallableStatement, and PreparedStatement interfaces define the methods and properties that enable you to send SQL or PL/SQL commands and receive data from your database.

They also define methods that help bridge data type differences between Java and SQL data types used in a database.

Three interfaces are provided.
- ```Statement```: Use this for general-purpose access to your database. Useful when you are using static SQL statements at runtime. The Statement interface cannot accept parameters.
- ```PreparedStatement```: Use this when you plan to use the SQL statements many times. The PreparedStatement interface accepts input parameters at runtime.
- ```CallableStatement```: Use this when you want to access the database stored procedures. The CallableStatement interface can also accept runtime input parameters. 

