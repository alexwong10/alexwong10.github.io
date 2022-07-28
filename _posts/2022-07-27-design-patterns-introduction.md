---
layout: post
show_date: true
title: "Design pattern introduction"
date: 2022-07-27
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---


Design patterns represent the best practices used by experienced object-oriented software developers. They are solutions to general problems that software developers faced during software development. These solutions were obtained by trial and error by numerous software developers over quite a substantial period of time.

## Why design patterns
- Common platform for developers

Design patterns provide a standard terminology and are specific to particular scenario. For example, a singleton design pattern signifies use of single object so all developers familiar with single design pattern will make use of single object and they can tell each other that program is following a singleton pattern.

- Best Practices

Design patterns have been evolved over a long period of time and they provide best solutions to certain problems faced during software development. Learning these patterns helps unexperienced developers to learn software design in an easy and faster way.

## Types of design patterns
As per the design pattern reference book Design Patterns - Elements of Reusable Object-Oriented Software , there are 23 design patterns which can be classified in three categories: Creational, Structural and Behavioral patterns. Another category of design pattern is J2EE design patterns, which are specifically concerned with the presentation tier, identified by Sun Java Center.

- Creational Patterns
They provide a way to create objects while **hiding the creation logic**, rather than instantiating objects directly using new operator. This gives program more flexibility in deciding which objects need to be created for a given use case.
- Structural Patterns
They concern class and object **composition**. Concept of inheritance is used to compose interfaces and define ways to compose objects to obtain new functionalities.
- Behavioral Patterns
They are specifically concerned with **communication** between objects.

## Design Principles
Before we start to learn patterns, we first discuss the principles.

There are 3 important characteristics of a bad design that should be avoided:
Rigidity - It is hard to change because every change affects too many other parts of the system.
Fragility - When you make a change, unexpected parts of the system break.
Immobility - It is hard to reuse in another application because it cannot be disentangled from the current application.

- Open Close Principle. Open for extension but closed for modifications
- Dependency Inversion Principle. High-level modules should not depend on low-level modules. Both of them should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.
- Interface Segregation Principle. Clients should not be forced to depend upon interfaces that they don't use.
- Single Responsibility Principle. A class should have only one reason to change.
- Liskov's Substitution Principle. Derived types must be completely substitutable for their base types.


## Creational Patterns
### Factory Pattern
In Factory pattern, we create object without exposing the creation logic to the client and refer to newly created object using a common interface. It is one of the most used design patterns in Java.

Intent

Implementation

Example

### Singleton Pattern
It involves a single class which is responsible to create an object while making sure that only single object gets created. This class provides a way to access its only object which can be accessed directly without need to instantiate the object of the class.

Intent

Implementation

Example

### Builder Pattern
Builder pattern builds a complex object using simple objects and using a step by step approach.

### Prototype Pattern
This pattern involves implementing a prototype interface which tells to create a clone of the current object. This pattern is used when creation of object directly is costly.


## Behavioral Pattern
### Chain of Responsibility
### Command
### Interpreter
### Iterator
### Mediator
### Memento
### Observer
### Strategy
### Template Method
### Visitor
### Null Object

## Structural Pattern
### Adapter
### Bridge
### Composite
### Decorator
### Flyweight
### Proxy