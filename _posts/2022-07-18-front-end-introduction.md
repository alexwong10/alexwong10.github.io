---
layout: post
show_date: true
title: "Front end introduction"
date: 2022-07-15
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

## Why HTML?
HTML stands for Hyper Text Markup Language. 

    Hypertext refers to the way in which Web pages (HTML documents) are linked together. Thus, the link available on a webpage is called Hypertext.

    Markup means you use HTML to simply "mark-up" a text document with tags that tell a Web browser how to structure it to display.


It was originally developed with the intent of defining the structure of documents like headings, paragraphs, lists, and so forth to facilitate the sharing of scientific information between researchers. Now, HTML is being widely used to format web pages with the help of different tags available in HTML language.

HTML is a MUST for students and working professionals to become a great Software Engineer specially when they are working in Web Development Domain. Here are some of the key advantages of learning HTML:

    Create Web site - You can create a website or customize an existing web template if you know HTML well.

    Become a web designer - If you want to start a carrer as a professional web designer, HTML and CSS designing is a must skill.

    Understand web - If you want to optimize your website, to boost its speed and performance, it is good to know HTML to yield best results.

    Learn other languages - Once you understands the basic of HTML then other related technologies like javascript, php, or angular are become easier to understand.

## HTML Basics
### Tags

As a markup language, HTML makes use of various tags to format the content. These tags are enclosed within angle braces ```<Tag Name>```. Except few tags, most of the tags have their corresponding closing tags. For example, ```<html>``` has its closing tag </html>```. Learning HTML is simple as users have to learn the usage of different tags in order to format the text or images to make a beautiful webpage. These tags and their contents are _elements_, which are organized as a typical document structure below 

```html
<html>

   <head>
      Document header related tags
   </head>
   
   <body>
      Document body related tags
   </body>
   
</html>
```

Here are some basic tag examples.
- heading
- paragraph
- line break
- center
- horizontal line
- preserve formatting
- nonbreaking spaces

### Elements
An HTML element is defined by a starting tag. An attribute is used to define the characteristics of an HTML element and is placed inside the element's opening tag. We use a name-value pair to represent attributes. There are four core attributes ```id```, ```class```, ```title``` and ```style``` as well as  three internationalization (global)attributes ```dir```, ```lang``` and ```xml:lang```.

## Why CSS
CSS (Cascading Style Sheet) is used to control the style of a web document in a simple and easy way.

It is one of the most widely used style language over the web, because:

    CSS saves time - You can write CSS once and then reuse same sheet in multiple HTML pages. You can define a style for each HTML element and apply it to as many Web pages as you want.

    Pages load faster - If you are using CSS, you do not need to write HTML tag attributes every time. Just write one CSS rule of a tag and apply it to all the occurrences of that tag. So less code means faster download times.

    Easy maintenance - To make a global change, simply change the style, and all elements in all the web pages will be updated automatically.

    Superior styles to HTML - CSS has a much wider array of attributes than HTML, so you can give a far better look to your HTML page in comparison to HTML attributes.

    Multiple Device Compatibility - Style sheets allow content to be optimized for more than one type of device. By using the same HTML document, different versions of a website can be presented for handheld devices such as PDAs and cell phones or for printing.

    Global web standards - Now HTML attributes are being deprecated and it is being recommended to use CSS. So its a good idea to start using CSS in all the HTML pages to make them compatible to future browsers.

Most commonly, CSS is combined with the markup languages HTML or XHTML.

## CSS Basics
A CSS comprises of style rules that are interpreted by the browser and then applied to the corresponding elements in your document. A style rule is made of three parts −

    Selector − A selector is an HTML tag at which a style will be applied. This could be any tag like <h1> or <table> etc.

    Property − A property is a type of attribute of HTML tag. Put simply, all the HTML attributes are converted into CSS properties. They could be color, border etc.

    Value − Values are assigned to properties. For example, color property can have value either red or #F1F1F1 etc.

```
selector { property: value }
```

There are four ways to associate styles with your HTML document. Most commonly used methods are inline CSS and External CSS.
- embedded
- inline
- external
- imported


