
'use server';

import { locateNearbyBranch } from '@/ai/flows/locate-nearby-branch';
import type { LocateNearbyBranchInput, LocateNearbyBranchOutput } from '@/ai/flows/locate-nearby-branch';
import { generateReferralMessage } from '@/ai/flows/generate-referral-message';
import type { GenerateReferralMessageInput, GenerateReferralMessageOutput } from '@/ai/flows/generate-referral-message';

export async function findBranchAction(
  input: LocateNearbyBranchInput
): Promise<LocateNearbyBranchOutput> {
  try {
    const result = await locateNearbyBranch(input);
    return result;
  } catch (error) {
    console.error('Error in findBranchAction:', error);
    throw new Error('Failed to locate a nearby branch. Please try again later.');
  }
}

export async function generateReferralMessageAction(
  input: GenerateReferralMessageInput
): Promise<GenerateReferralMessageOutput> {
  try {
    const result = await generateReferralMessage(input);
    // In a real application, you would integrate with an SMS gateway here
    // to send the result.message to the recipient's phone number.
    console.log(`Generated referral message: ${result.message}`);
    return result;
  } catch (error) {
    console.error('Error in generateReferralMessageAction:', error);
    throw new Error('Failed to generate referral message. Please try again later.');
  }
}
