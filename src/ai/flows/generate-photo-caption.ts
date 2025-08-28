'use server';

/**
 * @fileOverview AI-powered tool to generate engaging and relevant captions for photos.
 *
 * - generatePhotoCaption - A function that handles the caption generation process.
 * - GeneratePhotoCaptionInput - The input type for the generatePhotoCaption function.
 * - GeneratePhotoCaptionOutput - The return type for the generatePhotoCaption function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePhotoCaptionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  keywords: z.string().describe('Keywords related to the photo.'),
  style: z.string().optional().describe('The desired style of the caption (e.g., humorous, professional).'),
});
export type GeneratePhotoCaptionInput = z.infer<typeof GeneratePhotoCaptionInputSchema>;

const GeneratePhotoCaptionOutputSchema = z.object({
  caption: z.string().describe('The generated caption for the photo.'),
});
export type GeneratePhotoCaptionOutput = z.infer<typeof GeneratePhotoCaptionOutputSchema>;

export async function generatePhotoCaption(input: GeneratePhotoCaptionInput): Promise<GeneratePhotoCaptionOutput> {
  return generatePhotoCaptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePhotoCaptionPrompt',
  input: {schema: GeneratePhotoCaptionInputSchema},
  output: {schema: GeneratePhotoCaptionOutputSchema},
  prompt: `You are a creative marketing expert specializing in writing engaging captions for photos.

  Based on the photo, keywords, and desired style, generate a compelling caption.

  Photo: {{media url=photoDataUri}}
  Keywords: {{{keywords}}}
  Style: {{style}}

  Caption:`, // Removed hardcoded style to allow dynamic styling.
});

const generatePhotoCaptionFlow = ai.defineFlow(
  {
    name: 'generatePhotoCaptionFlow',
    inputSchema: GeneratePhotoCaptionInputSchema,
    outputSchema: GeneratePhotoCaptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
