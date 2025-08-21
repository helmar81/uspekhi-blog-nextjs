'use server';
/**
 * @fileOverview An image generation AI agent.
 *
 * - generateImage - A function that generates an image for a blog post.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  postContent: z.string().describe('The content of the blog post.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagePrompt',
  input: {schema: GenerateImageInputSchema},
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
    const {output: textPrompt} = await prompt(input);

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: textPrompt as string,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    return { imageDataUri: media.url };
  }
);
