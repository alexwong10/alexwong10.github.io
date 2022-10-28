---
layout: post
show_date: true
title: "Quickstart: How to write blogs on GitHub"
date: 2022-06-06
categories: coding
img: posts/20220606/ukiyoe-sample.jpg
tags: [tutorial]
author: cheungwong
Description: "Have you ever tried to build your own website and share your what you learn with others? Github provides a foolproof way to do that."
---

> TL;DR: follow [the official guide](https://docs.github.com/en/pages/quickstart).

Here we introduce a terse version, in three steps.

### [**Initial a repository**](https://docs.github.com/en/pages/quickstart)
First, we initial a reporsitory called ```username.github.io```. GitHub Pages embeded in a repository is available for us to create our own website. We can use the Jekyll Theme Chooser to load a pre-made theme and then modify the content and style. The site address will be limited as ```username.github.io``` in default. 

We can configure our website's information in the file ```_config.yml```. 
```
theme: jekyll-theme-minimal
title: YOUR-WEBSITE-TITLE
description: YOUR-WEBSITE-DESCRIPTION
```

Besides, we can rewrite the README.md as we like, which will be the introduction of the website. 

### [**Adding Content**](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-content-to-your-github-pages-site-using-jekyll#about-content-in-jekyll-sites)

The main types of content for Jekyll sites are pages and posts. 

<center><img src='./assets/img/posts/20220606/webrick-error.png'></center>

#### Pages
A page is for standalone content that isn't associated with a specific date, such as an "About" page. We can add following YAML frontmatter to the top of the file so that it can be published on ```https://USERNAME.github.io/URL-PATH```
```
layout: page
title: "PAGE TITLE"
permalink: /URL-PATH/
```


#### Posts
A post is a blog post. The default Jekyll site contains a directory named _posts that contains a default post file. Similar to page setting, we can add following YAML frontmatter to the top of the file.
```
layout: post
title: "POST TITLE"
date: YYYY-MM-DD hh:mm:ss -0000
categories: CATEGORY-1 CATEGORY-2
```
We can control the publishing path in ```_config.yml```.

### [**Build Locally**](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
In order to write in a way of *What You See Is What You Get*, we also want to preview and test changes to our site locally, rather than push it to github and wait for it to be built every time we finish a blog. 

#### Prerequisites
First, we need to configure local environment.
- Install [Jekyll](https://jekyllrb.com/docs/installation/)
- Create a Jekyll site. The key process is to create a Gemfile and write necessary dependencies.

>Jekyll is a **static site generator** with built-in support for GitHub Pages and a simplified build process. Jekyll takes Markdown and HTML files and creates a complete static website based on your choice of layouts.

#### Here we go
Through command ```bundle exec jekyll serve```, we can build our blog in default on 127.0.0.0:4000. Now let's dive into our folder and explore the structrue and important configuration file of our websites.

- ```_includes```: Similar to header files we include in C++. But here, we include them to build a web page.
- ```_layouts```: Defines different styles for us to arrange how a page looks like.
- ```_pages```: Defines more specificly how a page looks like, which often extend html file in ```_layouts```.
- ```_posts```: Contents we want to post. It is the pool of our thoughts.
- ```_site```: Static pages automatically generated will be stored on local ```_site``` directory. We can ignore them during version control. 
- ```assets```: Front end resources like css, fonts, and javascript are included. We can also upload images shown in our blogs to the ```img``` folder. 
- ```404.html``` and ```ipfs-404.html```: Defines a page when the page is not accessible.
- ```Gemfile```: Dependicies of jekyll.
- ```index.html```: The home page of our website.
- ```sitemap.xml```: Defines how a link is mapped to a specific html file. 

To wrap up, if we do not need to change the website style, it is enough for us to focus on ```_posts``` folder. For those who learn frontend knowledge, it is easy for them to design their own page's look by modifying the related file.

Now we can happily write down what we want and post them to the world. 






