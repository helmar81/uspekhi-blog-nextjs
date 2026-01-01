---
title: 'Next.js Deploy to Firebase'
date: '2025-09-08'
---


## Instruction

### This document outlines the process to efficiently deploy a Next.js project to Firebase, based on a successful migration from Astro.js

## 1. `firebase.json` Configuration

This configuration defines the hosting and functions settings for Firebase.

```json
/** firebase.json */
{
  "hosting": {
    "source": ".",
    "frameworksBackend": {
      "region": "europe-west1"
    }
  },
  "functions": {
    "source": ".",
    "runtime": "nodejs22"
  },
  "predeploy": [
    "rimraf .next",
    "npm run build"
  ]
}
```

## 2. `next.config.js` Configuration

This configuration handles Webpack warnings and experimental features to avoid common issues.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.ignoreWarnings = [
      { module: /handlebars/ }
    ];
    return config;
  },
  experimental: {
    swcTraceProfiling: false, // disables trace files to avoid EPERM issues
  },
};

module.exports = nextConfig;
```

## 3. Recommended `getServerSideProps` for Dynamic Pages (e.g., `/posts/[slug]`)

For pages that require Server-Side Rendering (SSR), such as `/posts/[slug]`, the `getServerSideProps` function is recommended to fetch data dynamically.

```typescript
// pages/posts/[slug].tsx
export async function getServerSideProps({ params }) {
  const post = await getPostBySlug(params.slug); // fetch post dynamically

  if (!post) return { notFound: true };

  return {
    props: { post },
  };
}

export default function PostPage({ post }) {
  return <div>{post.title}</div>;
}
```

## 4. Deployment Steps

The deployment process involves deploying **Hosting with your static pages** and a **Cloud Function for SSR pages** (e.g., `/posts/[slug]`). After deployment, static pages like `/about` or `/contact` will be served directly from Firebase Hosting, while dynamic pages like `/posts/firebase` will be rendered via a Cloud Function.

A robust `deploy.ps1` script is provided for Windows to automate the clean, build, and deploy process.

### `deploy.ps1` (final version)

This script performs several critical steps:

* **Frees port 9002** if it's in use.
* **Removes the `.next` folder** and any leftover `.next/trace` files to prevent EPERM errors.
* **Installs dependencies**, ignoring peer conflicts if necessary.
* **Builds the Next.js project** (supporting SSG + SSR).
* **Deploys to Firebase Hosting + Functions**.

### Open PowerShell in your project folder

cd "C:\Users\User\Documents\uspekhi-blog-nextjs-1"

## deploy.ps1 - Clean, build, and deploy Next.js + Firebase (SSR-ready, fully Windows-safe)

```powershell


Write-Host "➡ Navigating to project folder..." -ForegroundColor Yellow
Set-Location "C:\Users\User\Documents\uspekhi-blog-nextjs-1" # Update this path to your project folder

# Kill any Node.js process using port 9002
Write-Host "➡ Checking for processes on port 9002..." -ForegroundColor Yellow
$portInUse = Get-NetTCPConnection -LocalPort 9002 -ErrorAction SilentlyContinue
if ($portInUse) {
  $pids = $portInUse.OwningProcess | Select-Object -Unique
  foreach ($pid in $pids) {
    Write-Host "⚠ Killing process $pid using port 9002" -ForegroundColor Red
    Stop-Process -Id $pid -Force
  }
} else {
  Write-Host "ℹ Port 9002 is free." -ForegroundColor Green
}


# Remove .next folder and .next/trace files
Write-Host "➡ Cleaning .next folder and trace files..." -ForegroundColor Yellow
if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
  Write-Host "✔ .next folder deleted." -ForegroundColor Green
} else {
  Write-Host "ℹ No .next folder found." -ForegroundColor Cyan
}

# Also remove any leftover trace files (if somehow not cleaned)
$traceFiles = Get-ChildItem -Path ".next" -Recurse -Filter "trace" -ErrorAction SilentlyContinue
foreach ($file in $traceFiles) {
  Remove-Item -Force $file
  Write-Host "✔ Removed leftover trace file: $($file.FullName)" -ForegroundColor Green
}


# Install dependencies
Write-Host "➡ Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps


# Build Next.js project
Write-Host "➡ Building Next.js project..." -ForegroundColor Yellow
try {
  npm run build
} catch {
  Write-Host "❌ Build failed. Exiting." -ForegroundColor Red
  exit 1
}


# Deploy to Firebase Hosting + Functions
Write-Host "➡ Deploying to Firebase Hosting & Functions (SSR support)..." -ForegroundColor Yellow
try {
  firebase deploy
} catch {
  Write-Host "❌ Firebase deploy failed." -ForegroundColor Red
  exit 1
}
Write-Host "✔ Deployment complete!" -ForegroundColor Green
```

### Usage

1. Save the script as `deploy.ps1` in your project's root directory.
2. Open **PowerShell as Administrator**.
3. Run the following commands:

    ```powershell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\deploy.ps1
    ```


