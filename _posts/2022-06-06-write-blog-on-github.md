---
layout: post
title: "Quickstart: How to write a blog on GitHub"
date: 2022-06-06
tags: [Software development]
excerpt: "Have you ever tried to build your own website and share what you learn with others? GitHub provides a straightforward way to do that."
lang: en
---

## TL;DR: follow [the official guide](https://docs.github.com/en/pages/quickstart).

Here is a concise three-step version.

### [**Initialize a repository**](https://docs.github.com/en/pages/quickstart)
First, we initialize a repository called ```username.github.io```. GitHub Pages, when enabled for a repository, lets us create our own website. We can use the Jekyll Theme Chooser to load a pre-made theme and then modify the content and style. By default, the site address will be ```username.github.io```.

We can configure our website's information in the file ```_config.yml```. 
```
theme: jekyll-theme-minimal
title: YOUR-WEBSITE-TITLE
description: YOUR-WEBSITE-DESCRIPTION
```

We can also rewrite ```README.md``` as we like; it serves as the website's introduction.

### [**Adding Content**](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-content-to-your-github-pages-site-using-jekyll#about-content-in-jekyll-sites)

The main types of content for Jekyll sites are pages and posts. 

![img](/img/posts/20220606/webrick-error.png)

#### Pages
A page is for standalone content that isn't associated with a specific date, such as an "About" page. We can add the following YAML front matter to the top of the file so that it can be published at ```https://USERNAME.github.io/URL-PATH```
```
layout: page
title: "PAGE TITLE"
permalink: /URL-PATH/
```


#### Posts
A post is a blog post. The default Jekyll site contains a directory named _posts with a default post file. Similar to the page configuration above, we can add the following YAML front matter to the top of the file.
```
layout: post
title: "POST TITLE"
date: YYYY-MM-DD hh:mm:ss -0000
categories: CATEGORY-1 CATEGORY-2
```
We can control the publishing path in ```_config.yml```.

### [**Build Locally**](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
To work in a *What You See Is What You Get* way, we also want to preview and test changes to our site locally, rather than push them to GitHub and wait for the site to build every time we finish a post.

#### Prerequisites
First, we need to configure the local environment.
- Install [Jekyll](https://jekyllrb.com/docs/installation/)
- Create a Jekyll site. The key process is to create a Gemfile and write necessary dependencies.

> Jekyll is a **static site generator** with built-in support for GitHub Pages and a simplified build process. Jekyll takes Markdown and HTML files and creates a complete static website based on your choice of layouts.

#### Here we go
Many Jekyll themes are available on GitHub. We can also build a site directly by forking one of those repositories. With the command ```bundle exec jekyll serve```, we can build our blog locally at 127.0.0.1:4000. Now let's explore our folder's structure and the important configuration files for our site. Take the [MVM](https://github.com/the-mvm/the-mvm.github.io) theme as an example:

- ```_includes```: Similar to header files we include in C++. But here, we include them to build a web page.
- ```_layouts```: Defines styles that determine how a page looks.
- ```_pages```: Defines more specifically how a page looks, often extending an HTML file in ```_layouts```.
- ```_posts```: The content we want to publish; it is a collection of our thoughts.
- ```_site```: Generated static pages are stored in the local ```_site``` directory. We can ignore them during version control.
- ```assets```: Front-end resources such as CSS, fonts, and JavaScript are included. We can also upload images used in blog posts to the ```img``` folder.
- ```_config.yml```: The site's YAML configuration file.
- ```404.html``` and ```ipfs-404.html```: Define the page shown when a requested page is not found.
- ```Gemfile```: Jekyll dependencies.
- ```index.html```: The home page of our website.
- ```sitemap.xml```: Defines how links map to specific HTML files.

To wrap up, if we do not need to change the website's style, it is enough to focus on the ```_posts``` folder. For readers learning front-end development, modifying the relevant files makes it easy to design the look of their own pages.

Now we can write down what we want and share it with the world.






