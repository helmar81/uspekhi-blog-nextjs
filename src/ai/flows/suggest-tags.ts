// src/ai/flows/suggest-tags.ts
'use server';
/**
 * @fileOverview A tag suggestion AI agent.
 *
 * - suggestTags - A function that suggests tags for a blog post.
 * - SuggestTagsInput - The input type for the suggestTags function.
 * - SuggestTagsOutput - The return type for the suggestTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsInputSchema = z.object({
  postContent: z.string().describe('The content of the blog post.'),
});
export type SuggestTagsInput = z.infer<typeof SuggestTagsInputSchema>;

const SuggestTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the blog post.'),
});
export type SuggestTagsOutput = z.infer<typeof SuggestTagsOutputSchema>;

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
  return suggestTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTagsPrompt',
  input: {schema: SuggestTagsInputSchema},
  output: {schema: SuggestTagsOutputSchema},
  prompt: `You are a blog post tag suggestion expert.

  Given the content of a blog post, you will suggest 3 relevant tags that can be used to categorize the content and improve its discoverability.

  Blog Post Content: {{{postContent}}}

  Tags:`, // Removed extra newline here
});

const suggestTagsFlow = ai.defineFlow(
  {
    name: 'suggestTagsFlow',
    inputSchema: SuggestTagsInputSchema,
    outputSchema: SuggestTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
