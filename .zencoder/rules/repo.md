---
description: Repository Information Overview
alwaysApply: true
---

# Uspekhi Blog Information

## Summary
A Next.js blog application with Firebase integration, featuring markdown-based posts, AI capabilities via Genkit, and responsive UI using Tailwind CSS and Radix UI components. The blog includes portfolio, about, and contact sections.

## Structure
- **src/**: Core application code (Next.js app, components, hooks, utilities)
- **posts/**: Markdown files containing blog content
- **public/**: Static assets (images, icons)
- **functions/**: Firebase Cloud Functions
- **src/ai/**: AI integration with Genkit and Google AI

## Language & Runtime
**Language**: TypeScript
**Version**: ES2017 target
**Framework**: Next.js 15.3.3
**Node Version**: 22 (for Firebase Functions)
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- next: 15.3.3
- react: 18.3.1
- firebase: 11.9.1
- genkit: 1.17.0
- @genkit-ai/googleai: 1.14.1
- react-markdown: 9.0.1
- tailwind-merge: 3.0.1
- radix-ui components (various UI components)

**Development Dependencies**:
- typescript: 5.x
- tailwindcss: 3.4.1
- firebase-tools: 14.15.1
- genkit-cli: 1.14.1

## Build & Installation
```bash
# Install dependencies
npm install

# Development
npm run dev  # Runs Next.js with Turbopack on port 9002

# AI development
npm run genkit:dev  # Start Genkit with dev.ts
npm run genkit:watch  # Start Genkit with watch mode

# Production build
npm run build

# Firebase deployment
npm run firebase:build  # Builds the Next.js app
npm run firebase:deploy  # Deploys to Firebase
```

## Firebase Integration
**Configuration**: Firebase hosting with Next.js integration
**Functions**: TypeScript-based Cloud Functions (Node.js 22)
**Authentication**: Environment variables for Firebase configuration
**Deployment**: Uses firebase-frameworks for Next.js deployment

## Content Management
**Posts**: Markdown files in the `/posts` directory
**Frontmatter**: YAML frontmatter for post metadata (title, date)
**Parser**: Custom markdown parser in `src/lib/posts.ts`
**Rendering**: Uses react-markdown for rendering content

## AI Features
**Integration**: Genkit with Google AI (Gemini 2.0 Flash model)
**Components**: 
- Image generator component
- Tag suggester component
- AI flows for content generation

## Testing
**Type Checking**: 
```bash
npm run typecheck  # Runs TypeScript compiler without emitting files
```
**Linting**:
```bash
npm run lint  # Runs Next.js linting
```