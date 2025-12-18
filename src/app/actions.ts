// 'use server'; // Disabled for static export

// Mock types to avoid importing from server-side files
export interface LocateNearbyBranchInput {
  latitude: number;
  longitude: number;
}

export interface LocateNearbyBranchOutput {
  branchName: string;
  branchAddress: string;
}

export interface GenerateReferralMessageInput {
  referrerName: string;
  recipientName: string;
  relationship: 'Friend' | 'Relative';
  pwaLink: string;
}

export interface GenerateReferralMessageOutput {
  message: string;
}

export async function findBranchAction(
  input: LocateNearbyBranchInput
): Promise<LocateNearbyBranchOutput> {
  console.log('Mocking findBranchAction with input:', input);
  // Mock response
  return {
    branchName: "Pyramid Group Funerals - Head Office",
    branchAddress: "123 Mock Street, Pretoria, South Africa"
  };
}

export async function generateReferralMessageAction(
  input: GenerateReferralMessageInput
): Promise<GenerateReferralMessageOutput> {
  console.log('Mocking generateReferralMessageAction with input:', input);
  // Mock response
  return {
    message: `Hi ${input.recipientName}, this is ${input.referrerName}. I thought you might be interested in this: ${input.pwaLink}`
  };
}
