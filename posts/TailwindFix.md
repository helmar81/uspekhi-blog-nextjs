---
title: 'Tailwind Error'
date: '2025-12-30'
---

## Fixing Tailwind CSS v4 Errors in Vite Projects

If you're building a React + Vite app and hit a wall with Tailwind CSS v4 throwing PostCSS errors, you're not alone. Here's a full breakdown of the issue and how to fix it — especially if you're seeing errors like:

```html
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin...
```

### ❌ The Problem

Tailwind CSS v4 introduced ESM-only behavior and changed how PostCSS plugins are loaded. If your package.json includes:
```html
"type": "module"
```

...and you're using Vite, PostCSS may fail to load Tailwind correctly, resulting in a 500 Internal Server Error when compiling index.css.

✅ The Fix: Downgrade Tailwind to v3.4.3

Tailwind v3.4.3 works seamlessly with Vite and PostCSS without needing any plugin hacks.

```html
npm uninstall tailwindcss
npm install -D tailwindcss@3.4.3
```

✅ Clean package.json

Make sure your devDependencies look like this:
```html
"devDependencies": {
  "tailwindcss": "^3.4.3",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.23",
  "@vitejs/plugin-react": "^5.0.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.0"
}
```

Remove any @tailwindcss/postcss or @tailwindcss/vite entries.

✅ postcss.config.js

Create this in your project root:

```html
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


```

✅ tailwind.config.js

Also in your root:

```html
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

```


✅ src/index.css

Make sure this file contains:

```html
@tailwind base;
@tailwind components;
@tailwind utilities;

```

✅ Final Cleanup

```html
rm -rf node_modules package-lock.json dist .vite
npm install
npm run dev

```


Then hard refresh your browser (Ctrl + Shift + R).


### 🎉 Result


Tailwind CSS now compiles correctly, styles are applied, and your Vite dev server runs without errors.

This fix is confirmed to work with:

Tailwind CSS v3.4.3

Vite v6.2.0

React v19.2.0

PostCSS v8.5.6

If you're deploying to Firebase Hosting or preparing for PWA packaging, this setup is clean and production-ready.

## 🧠 Why this works
Tailwind v4 introduced ESM-only behavior and changed how PostCSS plugins are loaded. Vite’s plugin loader doesn’t fully support this yet when "type": "module" is set in package.json. Tailwind v3.4.3 avoids this issue and works seamlessly.





