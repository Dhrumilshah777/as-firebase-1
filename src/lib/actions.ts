'use server';

import { generatePhotoCaption } from '@/ai/flows/generate-photo-caption';
import { z } from 'zod';

const formSchema = z.object({
  photo: z.instanceof(File).refine(file => file.size > 0, 'Photo is required.'),
  keywords: z.string().min(1, 'Keywords are required.'),
  style: z.string().optional(),
});

async function fileToDataURI(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    return `data:${file.type};base64,${base64}`;
}

export async function generateCaptionAction(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    photo: formData.get('photo'),
    keywords: formData.get('keywords'),
    style: formData.get('style'),
  });

  if (!validatedFields.success) {
    const errorMsg = validatedFields.error.flatten().fieldErrors.photo?.[0] ?? validatedFields.error.flatten().fieldErrors.keywords?.[0] ?? "Invalid data.";

    return {
      message: errorMsg,
      errors: validatedFields.error.flatten().fieldErrors,
      caption: null,
    };
  }
  
  const { photo, keywords, style } = validatedFields.data;

  try {
    const photoDataUri = await fileToDataURI(photo);

    const result = await generatePhotoCaption({
      photoDataUri,
      keywords,
      style: style || 'creative',
    });

    return {
      message: 'Caption generated successfully!',
      caption: result.caption,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      caption: null,
      errors: null,
    };
  }
}
