'use server';

/**
 * @fileOverview This file defines a Genkit flow to locate nearby Pyramid Group Funerals branches using GPS coordinates.
 *
 * The flow takes latitude and longitude as input and returns the name and address of the nearest branch.
 * - locateNearbyBranch - A function that uses GPS coordinates to locate the nearest Pyramid Group Funerals branch.
 * - LocateNearbyBranchInput - The input type for the locateNearbyBranch function.
 * - LocateNearbyBranchOutput - The return type for the locateNearbyBranch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocateNearbyBranchInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user.'),
  longitude: z.number().describe('The longitude of the user.'),
});
export type LocateNearbyBranchInput = z.infer<typeof LocateNearbyBranchInputSchema>;

const LocateNearbyBranchOutputSchema = z.object({
  branchName: z.string().describe('The name of the nearest branch.'),
  branchAddress: z.string().describe('The address of the nearest branch.'),
});
export type LocateNearbyBranchOutput = z.infer<typeof LocateNearbyBranchOutputSchema>;

export async function locateNearbyBranch(input: LocateNearbyBranchInput): Promise<LocateNearbyBranchOutput> {
  return locateNearbyBranchFlow(input);
}

const locateNearbyBranchTool = ai.defineTool({
  name: 'getNearestBranch',
  description: 'Tool to retrieve the nearest Pyramid Group Funerals branch based on GPS coordinates.',
  inputSchema: LocateNearbyBranchInputSchema,
  outputSchema: LocateNearbyBranchOutputSchema,
},
async (input) => {
    // Mock implementation - replace with actual branch lookup logic
    // This could involve calling an external API or querying a database
    console.log(`Finding nearest branch to latitude: ${input.latitude}, longitude: ${input.longitude}`);

    // Dummy data for demonstration purposes
    const nearestBranch = {
      branchName: 'Sample Pyramid Branch',
      branchAddress: '123 Mock Street, Sample City',
    };

    return nearestBranch;
  }
);

const locateNearbyBranchPrompt = ai.definePrompt({
  name: 'locateNearbyBranchPrompt',
  input: {schema: LocateNearbyBranchInputSchema},
  output: {schema: LocateNearbyBranchOutputSchema},
  tools: [locateNearbyBranchTool],
  prompt: `You are a helpful assistant for Pyramid Group Funerals. The user is trying to locate the nearest branch to their current location.  Use the getNearestBranch tool to find the nearest branch to the user's location.

User Location: Latitude: {{{latitude}}}, Longitude: {{{longitude}}}
`,
});

const locateNearbyBranchFlow = ai.defineFlow(
  {
    name: 'locateNearbyBranchFlow',
    inputSchema: LocateNearbyBranchInputSchema,
    outputSchema: LocateNearbyBranchOutputSchema,
  },
  async input => {
    const {output} = await locateNearbyBranchPrompt(input);
    return output!;
  }
);
