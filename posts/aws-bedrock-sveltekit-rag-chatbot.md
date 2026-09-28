---
title: "Building a RAG Chatbot with AWS Bedrock, S3 Vectors and SvelteKit"
description: "A practical guide to building and deploying a streaming RAG chatbot with Amazon Bedrock Knowledge Bases, S3 Vectors, SvelteKit and AWS Amplify."
date: '2026-09-28'
author: "Helmar Baechle"
tags:
  - AWS
  - Amazon Bedrock
  - RAG
  - SvelteKit
  - AWS Amplify
  - S3 Vectors
  - Generative AI
  - TypeScript
---



Building an AI chatbot is relatively easy when you are only interested in a prototype. The more interesting challenge begins when you want the application to use your own documents, retrieve relevant information, stream responses in real time, and run reliably in the cloud.

In this project I combined **Amazon Bedrock Knowledge Bases, Amazon S3, S3 Vectors, SvelteKit and AWS Amplify** to build a Retrieval-Augmented Generation (RAG) chatbot.

The complete integration journey also revealed a number of important AWS deployment lessons around IAM, inference profiles, environment variables, Node.js versions and Amplify's Web Compute platform.

## The architecture

The basic architecture looks like this:

```text
S3 Source Bucket
       ↓
Amazon Bedrock Knowledge Base
       ↓
S3 Vector Bucket
       ↓
SvelteKit Server API
       ↓
Server-Sent Events (SSE)
       ↓
SvelteKit Chat Interface
```

The S3 source bucket contains the documents used as the chatbot's knowledge base.

Amazon Bedrock processes those documents, splits them into chunks and creates embeddings. In this implementation, the knowledge base uses **Amazon Titan Embedding G1 – Text v1.2**, producing 1536-dimensional embeddings.

The resulting vectors are stored in an **S3 Vector Bucket**. When a user asks a question, Bedrock retrieves semantically relevant content and generates an answer based on that information.

The SvelteKit server endpoint then streams the response back to the browser using **Server-Sent Events (SSE)**.

This makes the interface behave like a modern AI chat application, where the answer appears progressively rather than arriving as one large response.

## Why S3 Vectors?

One of the decisions in this project was to move away from an external vector database and use **S3 Vectors**.

There were several practical reasons for this:

- AWS-native integration
- Same-region deployment with Bedrock
- IAM-based access control
- Fewer external credentials and services
- Less third-party infrastructure to maintain

Keeping the vector store inside the AWS ecosystem also simplifies the architecture.

For this project, the relevant AWS region was **eu-central-1 (Frankfurt)**.

## Creating the vector index

The vector index needs to use the correct embedding dimensions.

The project uses:

- **Embedding model:** Amazon Titan Embedding G1 – Text v1.2
- **Dimensions:** 1536
- **Distance metric:** Cosine

The dimension count is particularly important.

If the vector index expects a different number of dimensions from the embedding model, synchronization can fail. If the embedding model is changed later, the vector index needs to be configured appropriately for the new embedding dimensions.

## Creating the Bedrock Knowledge Base

The Knowledge Base connects the document storage, embedding model and vector store.

The basic configuration is:

1. Create an Amazon S3 data source.
2. Point it to the source bucket.
3. Select S3 Vectors as the vector store.
4. Select the appropriate vector bucket and index.
5. Select Amazon Titan Embedding G1 – Text v1.2.
6. Create the Knowledge Base.
7. Synchronize the data source.

An important lesson from the project was to **test the Knowledge Base directly in the Amazon Bedrock console before writing application code**.

If the Knowledge Base does not return the expected information in the console, adding a SvelteKit application on top of it only makes troubleshooting more complicated.

## Model selection and inference profiles

Model selection was another important part of the deployment.

The guide documents that **Claude 3 Sonnet has reached end of life**, so applications should not rely on the retired model identifier.

For applications running in `eu-central-1`, the project also uses **Bedrock inference profiles** rather than directly referencing a foundation-model ARN.

The documented working model for this project is **Amazon Nova Pro 1.0** through the appropriate inference profile.

This distinction matters because using an incompatible foundation-model ARN can result in an `invalid model identifier` error.

Inference-profile permissions may also require:

- `bedrock:GetInferenceProfile`
- `bedrock:ListInferenceProfiles`

## IAM: one of the most important parts

The application needs permission to communicate with AWS services, but credentials and roles need to be handled carefully.

A major security lesson from this project is:

> **Never use AWS root access keys for an application.**

Use a dedicated IAM identity with only the permissions required by the application. For production environments, IAM roles are preferable where possible.

The deployment also involves different roles for different AWS services.

For example:

- The **Amplify service role** allows Amplify to build and deploy the application.
- The **Bedrock execution role** allows the Knowledge Base to access the required AWS resources.

Confusing these roles can result in errors such as:

```text
Unable to assume specified IAM Role
```

IAM trust relationships are just as important as the permissions themselves.

## The SvelteKit backend

The chatbot exposes a server-side endpoint such as:

```text
src/routes/api/chat/+server.ts
```

The endpoint receives a user's message and calls the AWS SDK's:

```text
RetrieveAndGenerateStreamCommand
```

The important point is that the Bedrock call happens **server-side**.

The browser should not directly call Bedrock with AWS credentials.

A simplified request flow is:

```text
Browser
   ↓
POST /api/chat
   ↓
SvelteKit server
   ↓
Amazon Bedrock
   ↓
Knowledge Base retrieval
   ↓
Generated response
   ↓
SSE stream
   ↓
Browser
```

The server can maintain conversation information so that multiple messages can belong to the same conversation.

## Streaming with Server-Sent Events

Instead of waiting for the entire AI response, the backend streams events to the frontend.

The application can handle events such as:

- `text`
- `citations`
- `done`
- `error`

The frontend receives the text progressively and updates the chat interface as new chunks arrive.

This creates a much better user experience than waiting for a complete JSON response.

## The SvelteKit frontend

The Svelte chat component connects to the server endpoint and reads the SSE stream.

The frontend can:

- Send a question
- Display response chunks as they arrive
- Display citations
- Maintain a conversation
- Start a new chat
- Handle errors

The result is a relatively lightweight interface while the AI and retrieval logic remain on the server.

## AWS Amplify: Web Compute vs Web

One of the most important deployment discoveries was the difference between **Web** and **Web Compute** in AWS Amplify.

A SvelteKit application containing server-side API routes needs a server runtime.

If the application is deployed as a static Web application, an endpoint such as:

```text
/api/chat
```

can return:

```text
404 Not Found
```

For this architecture, the Amplify platform needs to be **WEB_COMPUTE**.

This was one of the key fixes discovered during the deployment troubleshooting process.

## amplify-adapter and the build directory

The project uses `amplify-adapter` rather than relying on the default adapter.

One important Version 3 change is the deployment output directory.

The adapter produces:

```text
build/
```

Therefore, the Amplify configuration needs to use the correct `baseDirectory`:

```yaml
baseDirectory: build
```

Using the wrong directory can lead to deployment errors such as a missing deployment manifest.

## Runtime environment variables

Another interesting problem appeared with environment variables.

Amplify environment variables can be available during the build, but the SvelteKit server running in the Amplify compute environment also needs access to the required values at runtime.

The solution documented in the project is to inject the environment variables into the runtime build output and load them with `dotenv`.

The runtime `.env` is placed under:

```text
build/compute/default/
```

and loaded through:

```text
hooks.server.ts
```

The application then reads server-side values through:

```javascript
process.env
```

rather than depending on SvelteKit's `$env/dynamic/private` mechanism for this particular deployment configuration.

### A note about environment variable names

The project also encountered an Amplify restriction involving variables beginning with:

```text
AWS_
```

The documented workaround was to use application-specific names such as:

```text
MY_ACCESS_KEY_ID
MY_SECRET_ACCESS_KEY
BEDROCK_KB_ID
```

Never commit real credentials to Git.

Use placeholders in documentation and keep secrets outside the repository.

## Node.js 20+

Another important Version 3 change is the Node.js requirement.

The newer AWS Bedrock Agent Runtime SDK version used by the project requires:

```text
Node.js 20+
```

Using an older Node.js runtime can result in build or runtime compatibility problems.

For a new project, it is therefore important to verify the Node.js version locally and in the Amplify build environment.

## Updating the Knowledge Base

One of the advantages of using S3 as the source for the Knowledge Base is that updating the chatbot's information does not require changing the application code.

The workflow is simple:

| Task | S3 | Bedrock |
|---|---|---|
| Add document | Upload file | Sync |
| Update document | Replace file | Sync |
| Delete document | Delete file | Sync |
| Bulk update | Upload/delete files | Sync once |

The important part is:

> **Always synchronize the Knowledge Base after changing the source documents.**

If files are changed in S3 but the Knowledge Base is not synchronized, the chatbot can continue using the previous indexed content.

## Organizing the source documents

Document organization can also influence the maintainability of the system.

Useful practices include:

- Use meaningful filenames.
- Organize related documents into S3 folders.
- Keep documents focused on specific topics.
- Upload multiple changes before performing one synchronization.

For example:

```text
s3://your-source-bucket/
├── faq/
├── policies/
├── guides/
└── reference/
```

Meaningful filenames are also useful because source filenames can appear in citation information.

## Troubleshooting lessons

The deployment produced a useful collection of real-world troubleshooting scenarios.

Some of the most important ones were:

### Retired model

**Problem:** A Claude 3 Sonnet model identifier returns an end-of-life error.

**Lesson:** Check the current model availability and use a supported model or inference profile.

### Invalid model identifier

**Problem:** A foundation-model ARN is rejected.

**Lesson:** In regions where cross-region inference profiles are required, use the appropriate inference profile.

### Missing inference-profile permissions

**Problem:** Bedrock cannot access an inference profile.

**Lesson:** Check permissions such as:

```text
bedrock:GetInferenceProfile
bedrock:ListInferenceProfiles
```

### `/api/chat` returns 404

**Problem:** The SvelteKit API endpoint cannot be found after deployment.

**Lesson:** Verify that Amplify is using **WEB_COMPUTE**, not a static Web deployment.

### Wrong Amplify adapter

**Problem:** The deployment output is not structured as expected.

**Lesson:** Use `amplify-adapter` and configure the correct build directory.

### Wrong environment variable prefix

**Problem:** An environment variable is rejected or unavailable.

**Lesson:** Avoid reserved `AWS_` prefixes for application variables and use an appropriate application-specific prefix.

### GET vs POST

**Problem:** An API route expects POST but is accessed as GET.

**Lesson:** Verify that the frontend request method matches the SvelteKit server handler.

### Vector dimension mismatch

**Problem:** Knowledge Base synchronization fails.

**Lesson:** Ensure the vector index dimensions match the selected embedding model.

### Node.js version

**Problem:** The AWS SDK does not work correctly with an older Node.js runtime.

**Lesson:** Use Node.js 20 or newer for the documented SDK configuration.

### Runtime environment variables missing

**Problem:** The application works during build but cannot find credentials or configuration at runtime.

**Lesson:** Verify the runtime `.env` injection and `hooks.server.ts` configuration.

### Wrong IAM service role

**Problem:** Amplify or Bedrock cannot assume a required role.

**Lesson:** Check both the attached permissions and the IAM trust relationship.

## AWS CloudShell

The guide also documents AWS CloudShell as a useful alternative to installing and configuring the AWS CLI locally.

CloudShell provides a browser-based command-line environment with AWS CLI access.

This can be particularly useful when troubleshooting:

- Amplify platform configuration
- Deployment jobs
- Environment variables
- Application status
- CloudWatch or Amplify logs

It can also avoid local PowerShell-specific command-line issues.

## Security checklist

Before deploying a Bedrock application, I would check the following:

- [ ] Never use AWS root credentials.
- [ ] Keep credentials out of Git.
- [ ] Keep Bedrock calls on the server.
- [ ] Use IAM roles where possible.
- [ ] Grant only the permissions the application needs.
- [ ] Verify IAM trust relationships.
- [ ] Keep `.env` files out of version control.
- [ ] Use server-side environment variables.
- [ ] Do not expose AWS credentials to the browser.

## Final architecture

The completed system can be summarized as:

```text
                 ┌─────────────────────┐
                 │    Source Documents │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    Amazon S3        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Bedrock Knowledge   │
                 │       Base          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │    S3 Vectors       │
                 │   Vector Index      │
                 └──────────┬──────────┘
                            │
                            ▼
┌───────────────┐   ┌─────────────────────┐
│ SvelteKit UI  │◄──│ SvelteKit API Route │
└───────────────┘   └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Amazon Bedrock     │
                    │  Inference Profile  │
                    └─────────────────────┘

                    AWS Amplify
                    WEB_COMPUTE
```

## Conclusion

This project was a good reminder that building an AI application is only part of the job.

The prototype can be straightforward. The difficult part is often everything around it:

**IAM + model configuration + vector storage + server runtime + environment variables + deployment configuration + monitoring + security.**

The combination of **Amazon Bedrock Knowledge Bases, S3 Vectors, SvelteKit and AWS Amplify** provides a powerful AWS-native foundation for building document-aware AI applications.

The biggest lessons from this integration were:

1. Test the Bedrock Knowledge Base before connecting application code.
2. Make sure vector dimensions match the embedding model.
3. Use supported inference profiles for the selected AWS region.
4. Deploy SvelteKit server routes using Amplify Web Compute.
5. Use `amplify-adapter` and the correct `build` directory.
6. Understand the difference between build-time and runtime environment variables.
7. Use Node.js 20+ with the documented AWS SDK configuration.
8. Treat IAM and credentials as a core part of the architecture, not an afterthought.
9. Keep all Bedrock access on the server.
10. Synchronize the Knowledge Base whenever source documents change.

The troubleshooting journey was just as valuable as getting the chatbot working.

---

**Source:** Technical integration guide, *AWS Bedrock Knowledge Base + SvelteKit Integration Guide, Version 3*, September 2026.
