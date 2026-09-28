---
title: 'Ship a SvelteKit App with Firebase'
date: '2024-01-15'
excerpt: 'A realistic path from idea to live app using SvelteKit and Firebase. Learn how to build and deploy production-ready web applications with modern tooling.'
---

# Ship a SvelteKit App with Firebase

SvelteKit has matured into one of the most developer-friendly full-stack frameworks available. Combined with Firebase's backend services, you have everything needed to ship a production app fast—without over-engineering your stack.

This guide walks you through building and deploying a real SvelteKit application with Firebase, from local development to live production.

---

## Why SvelteKit + Firebase?

**SvelteKit** gives you:
- Ultra-fast page loads through compilation (no virtual DOM overhead)
- Built-in SSR, SSG, and client-side rendering
- File-based routing that makes sense
- Excellent developer experience with hot reload
- TypeScript support out of the box

**Firebase** provides:
- Firestore database (NoSQL, real-time)
- Authentication (email, Google, GitHub, etc.)
- Hosting with automatic SSL
- Cloud Functions for serverless backend
- Free tier generous enough for most side projects

Together, they let solo developers and small teams ship complete applications without managing infrastructure.

---

## What Makes Svelte Different?

Unlike React or Vue, **Svelte is a compiler**, not a runtime framework. Here's what that means:

### Traditional Frameworks (React/Vue)
```
Your Code → Browser → Framework Runtime → Your App
                      ↑
                   (adds ~40-100KB)
```

### Svelte
```
Your Code → Compiler → Optimized Vanilla JS → Browser
                      ↑
                   (no runtime overhead)
```

The result? Smaller bundles, faster initial loads, and less JavaScript shipped to users.

---

## Understanding Svelte Syntax

A basic `.svelte` file looks like this:

```svelte
<script>
  let count = 0;
  
  function increment() {
    count += 1;  // Reactivity is automatic!
  }
</script>

<style>
  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  button:hover {
    background: #e63900;
  }
</style>

<button on:click={increment}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

**Key features:**
- `<script>` for logic (JavaScript/TypeScript)
- `<style>` automatically scoped to this component
- Curly braces `{}` for dynamic values
- `on:click` for event handlers
- **Reactivity just works**—no `useState`, `ref`, or `computed`

---

## Setting Up Your SvelteKit Project

### 1. Create a New SvelteKit App

```bash
npx sv create svelte
cd my-app
npm install
```

When prompted:
- Choose "SvelteKit demo app" (or "Skeleton project")
- Enable TypeScript (recommended)
- Add ESLint and Prettier
- Add Playwright for testing (optional)

### 2. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app.

---

## Project Structure

```
my-app/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── +page.svelte     # Homepage
│   │   ├── +layout.svelte   # Shared layout
│   │   ├── about/
│   │   │   └── +page.svelte # /about route
│   │   └── blog/
│   │       ├── +page.svelte       # /blog
│   │       └── [slug]/
│   │           └── +page.svelte   # /blog/post-slug
│   ├── lib/                 # Reusable code
│   │   └── components/      # Shared components
│   └── app.html             # HTML template
├── static/                  # Static assets
└── svelte.config.js         # SvelteKit config
```

**File-based routing:**
- `routes/+page.svelte` → `/`
- `routes/about/+page.svelte` → `/about`
- `routes/blog/[id]/+page.svelte` → `/blog/123`

---

## Integrating Firebase

### 1. Install Firebase

```bash
npm install firebase
```

### 2. Create Firebase Config

Create `src/lib/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### 3. Environment Variables

Create `.env` in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**Important:** Add `.env` to your `.gitignore`!

---

## Building a Real Feature: Todo List

### Create the Component

`src/routes/+page.svelte`:

```svelte
<script>
  import { onMount } from 'svelte';
  import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
  import { db } from '$lib/firebase';

  let todos = [];
  let newTodo = '';
  let loading = true;

  onMount(async () => {
    await loadTodos();
  });

  async function loadTodos() {
    loading = true;
    const querySnapshot = await getDocs(collection(db, 'todos'));
    todos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    loading = false;
  }

  async function addTodo() {
    if (!newTodo.trim()) return;
    
    await addDoc(collection(db, 'todos'), {
      text: newTodo,
      completed: false,
      createdAt: new Date()
    });
    
    newTodo = '';
    await loadTodos();
  }

  async function deleteTodo(id) {
    await deleteDoc(doc(db, 'todos', id));
    await loadTodos();
  }
</script>

<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
  }

  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: #f5f5f5;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem 1rem;
    background: #ff3e00;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  button:hover {
    background: #e63900;
  }

  .delete-btn {
    background: #dc2626;
  }
</style>

<div class="container">
  <h1>My Todos</h1>
  
  <form on:submit|preventDefault={addTodo}>
    <input
      type="text"
      bind:value={newTodo}
      placeholder="Add a new todo..."
    />
    <button type="submit">Add Todo</button>
  </form>

  {#if loading}
    <p>Loading...</p>
  {:else if todos.length === 0}
    <p>No todos yet. Add one above!</p>
  {:else}
    {#each todos as todo (todo.id)}
      <div class="todo-item">
        <span>{todo.text}</span>
        <button class="delete-btn" on:click={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    {/each}
  {/if}
</div>
```

**Key Svelte features used:**
- `onMount` lifecycle function
- `bind:value` for two-way binding
- `on:submit|preventDefault` for form handling
- `{#if}` / `{:else}` conditional rendering
- `{#each}` loops with key tracking
- Scoped styles automatically

---

## Deploying to Firebase Hosting

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialize Firebase

```bash
firebase init hosting
```

Choose:
- Create a new project or use existing
- Build directory: `build`
- Single-page app: `No`
- GitHub Actions: `Yes` (optional)

### 3. Configure for SvelteKit

Update `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};
```

Install the static adapter:

```bash
npm install -D @sveltejs/adapter-static
```

### 4. Build and Deploy

```bash
npm run build
firebase deploy --only hosting
```

Your app is now live at `https://your-project.web.app`!

---

## Adding Firebase Authentication

Here's a quick auth component:

```svelte
<script>
  import { auth } from '$lib/firebase';
  import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
  import { onAuthStateChanged } from 'firebase/auth';

  let user = null;

  onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;
  });

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function logout() {
    await signOut(auth);
  }
</script>

{#if user}
  <div>
    <p>Welcome, {user.displayName}!</p>
    <button on:click={logout}>Sign Out</button>
  </div>
{:else}
  <button on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
```

---

## Performance Tips

1. **Use `@sveltejs/adapter-auto`** for flexibility across hosting platforms
2. **Prerender static pages** in `+page.js`:
   ```javascript
   export const prerender = true;
   ```
3. **Lazy load components** with dynamic imports:
   ```javascript
   const MyComponent = import('./MyComponent.svelte');
   ```
4. **Optimize images** - use WebP format and responsive sizes
5. **Enable compression** in Firebase hosting config

---

## Common Pitfalls

**❌ Problem:** Firebase config exposed in client code
**✅ Solution:** Use environment variables with `VITE_` prefix

**❌ Problem:** Firestore rules too permissive
**✅ Solution:** Always set proper security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**❌ Problem:** App breaks on refresh in production
**✅ Solution:** Use `@sveltejs/adapter-static` with proper config

---

## Next Steps

- Add **Cloud Functions** for backend logic
- Implement **real-time updates** with Firestore snapshots
- Set up **CI/CD** with GitHub Actions
- Add **analytics** with Firebase Analytics
- Explore **SvelteKit's form actions** for better UX

---

## Why This Stack Works

For solo developers and small teams:
- **Fast to prototype** - get from idea to MVP quickly
- **Scales well** - Firebase handles growth automatically
- **Low cost** - free tier covers most projects
- **Great DX** - SvelteKit's conventions make sense
- **Production-ready** - both are battle-tested

You're not just building a demo—you're shipping a real product.

---

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

**Ready to build?** Start with this stack and see how fast you can go from zero to deployed. The combination of SvelteKit's simplicity and Firebase's services removes most of the friction in modern web development.