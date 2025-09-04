---
title: 'Create a PWA with IONIC'
date: '2023-06-01'
---

## Build fast, content-focused websites

Astro is a static site builder designed to make it easy to create fast, content-focused websites. With Astro, you can use your favorite framework, such as React, Svelte, or Vue, to build your site and get lightning-fast performance. Astro also supports features like TypeScript, Scoped CSS, and Sass, and comes with built-in support for SEO and syndication through features like automatic sitemaps, RSS feeds, and pagination. Additionally, Astro can automatically hydrate interactive components on demand, so your users only load the content they need. Whether you're looking to build a simple blog or a complex web application, Astro has you covered.

### Getting Started

Starting a new project in Astro is easy:

```shell
# create your project
mkdir new-project-directory
npm create astro@latest
cd new-project-directory
npm init astro

# install your dependencies
npm install

# start the dev server and open your browser
npm run dev
```

### How Astro Works

Astro is a static site generator that allows you to build websites using your favorite JavaScript web framework, such as React, Svelte, or Vue. It generates static HTML during the build process, resulting in a fully static website with no JavaScript on the final page. However, Astro also allows you to add client-side JavaScript when needed, such as for interactive components like image carousels or shopping carts. These components are only loaded when needed, and the rest of the site remains as lightweight, static HTML. This me