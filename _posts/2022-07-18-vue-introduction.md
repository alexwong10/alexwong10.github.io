---
layout: post
show_date: true
title: "Vue introduction"
date: 2022-07-15
categories: coding
img:
tags: [tutorial]
author: cheungwong
Description: ""
---

VueJS is a progressive JavaScript framework used to develop interactive web interfaces. Focus is more on the view part, which is the front end. It is very easy to integrate with other projects and libraries.

## Example
We first include vue at head
```<script type = "text/javascript" src = "js/vue.js"></script>```.

```html
<html>
   <head>
      <title>VueJs Introduction</title>
      <script type = "text/javascript" src = "js/vue.js"></script>
   </head>
   <body>
      <div id = "intro" style = "text-align:center;">
         <h1>{{ message }}</h1>
      </div>
      <script type = "text/javascript">
         var vue_det = new Vue({
            el: '#intro',
            data: {
               message: 'My first VueJS Task'
            }
         });
      </script>
   </body>
</html>
```

There is a div which is added in the body that prints “My first VueJS Task” in the browser.
```html
<div id = "intro" style = "text-align:center;">
   <h1>{{ message }}</h1>
</div>
```
We have also added a message in an interpolation, i.e. {{}}. This interacts with VueJS and prints the data in the browser. To get the value of the message in the DOM, we are creating an instance of vuejs as follows.

```
var vue_det = new Vue({
   el: '#intro',
   data: {
      message: 'My first VueJS Task'
   }
})
```

In the above code snippet, we are calling Vue instance, which takes the id of the DOM element i.e. el:’#intro’. There is data with the message which is assigned the value ‘My first VueJS Task’. VueJS interacts with DOM and changes the value in the DOM {{message}} with ’My first VueJS Task’.

## Instance
To start with VueJS, we need to create the instance of Vue, which is called the root Vue Instance.

```
var app = new Vue({
   // options
})
```

There are three parts of the Vue constructor。
- ```el```: It takes the id of the DOM element present in ```.html```.

- ```data```: It can be an object or a function. Vue converts its properties to getters/setters to make it reactive.

- ```methods```:  Methods are to be included with the Vue instance as shown in the following code. We can access the function using the Vue object.





