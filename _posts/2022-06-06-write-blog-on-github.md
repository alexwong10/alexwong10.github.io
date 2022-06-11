---
layout: post
title: "Quickstart: How to write blogs on GitHub"
date: 2022-06-06 21:00:00 +0800
categories: coding
---

## Quickstart: How to write blogs on GitHub

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


### [**Build Locally**](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)
In order to write with a way of *What You See Is What You Get*, we also want to test it locally rather than push it to github and wait for it to be built every time we finish a blog. 

#### Prerequisites
First, we need to configure local environment.
- Install [Jekyll](https://jekyllrb.com/docs/installation/)
- 