'use server';
/**
 * @fileOverview An image generation AI agent.
 *
 * - generateImage - A function that generates an image for a blog post.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  postContent: z.string().describe('The content of the blog post.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(
  input: GenerateImageInput
): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: { schema: GenerateImageInputSchema },
  prompt: `You are an expert at creating visually stunning and relevant header images for blog posts.
Your task is to analyze the provided blog post content and generate a prompt for an image generation model that captures the essence of the article.
The image should be visually appealing and suitable for a blog header.

Blog Post Content:
---
{{{postContent}}}
---

Based on the content, create a concise and descriptive prompt for an image generation model.`,
});

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async input => {
    const { output: textPrompt } = await prompt(input);

    // Debugging: Log the generated prompt to ensure it's not empty.
    console.log(`[generateImageFlow] Attempting to generate image with prompt: "${textPrompt}"`);
    if (!textPrompt || typeof textPrompt !== 'string' || textPrompt.trim() === '') {
        throw new Error('Image generation failed because the generated text prompt was empty.');
    }

    const { media } = await ai.generate({
      // === THE CRITICAL CHANGE IS HERE ===
      // Switched to the standard, stable model for image generation.
      model: 'googleai/imagen-2',

      // The 'imagen-2' model correctly uses the 'prompt' parameter.
      prompt: textPrompt as string,

      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed: no media URL was returned from the API.');
    }

    return { imageDataUri: media.url };
  }
);