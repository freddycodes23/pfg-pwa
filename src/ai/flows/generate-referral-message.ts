
/**
 * @fileOverview This file defines a Genkit flow to generate a personalized referral message.
 *
 * - generateReferralMessage - A function that creates a warm, personalized message for referring a friend or relative.
 * - GenerateReferralMessageInput - The input type for the generateReferralMessage function.
 * - GenerateReferralMessageOutput - The return type for the generateReferralMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateReferralMessageInputSchema = z.object({
  referrerName: z.string().describe('The name of the person sending the referral.'),
  recipientName: z.string().describe("The name of the person being referred."),
  relationship: z.enum(['Friend', 'Relative']).describe("The recipient's relationship to the referrer."),
  pwaLink: z.string().url().describe('The link to the PWA for the application.'),
});
export type GenerateReferralMessageInput = z.infer<typeof GenerateReferralMessageInputSchema>;

export const GenerateReferralMessageOutputSchema = z.object({
  message: z.string().describe('The generated, personalized message for WhatsApp.'),
});
export type GenerateReferralMessageOutput = z.infer<typeof GenerateReferralMessageOutputSchema>;

export async function generateReferralMessage(input: GenerateReferralMessageInput): Promise<GenerateReferralMessageOutput> {
  return generateReferralMessageFlow(input);
}

const referralPrompt = ai.definePrompt({
  name: 'generateReferralPrompt',
  input: { schema: GenerateReferralMessageInputSchema },
  output: { schema: GenerateReferralMessageOutputSchema },
  prompt: `You are an expert copywriter for a funeral services company called Pyramid Group Funerals.
Your task is to write a short, warm, and professional message for WhatsApp.

The message is a referral from an existing customer to a potential new one.

- The message must start with "Good day, [Recipient's Name]".
- Mention that their {{relationship}}, {{referrerName}}, has referred them to Pyramid Group Funerals.
- Include the provided PWA link for them to learn more and download the app: {{{pwaLink}}}
- Keep the message concise and suitable for WhatsApp.

**Relationship:** {{relationship}}
**Referrer's Name:** {{referrerName}}
**Recipient's Name:** {{recipientName}}
**PWA Link:** {{{pwaLink}}}

Generate the message content for the 'message' output field.`,
});

const generateReferralMessageFlow = ai.defineFlow(
  {
    name: 'generateReferralMessageFlow',
    inputSchema: GenerateReferralMessageInputSchema,
    outputSchema: GenerateReferralMessageOutputSchema,
  },
  async (input) => {
    const { output } = await referralPrompt(input);
    return output!;
  }
);

    