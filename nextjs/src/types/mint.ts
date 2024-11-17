// src/types/mint.ts
export interface Emotion {
    name: string;
    value: number;
    description: string;
    color: string; // For UI styling
  }
  
  export interface MintResult {
    success: boolean;
    data?: {
      tokenId: string;
      mintTxHash: string;
      setUrisTxHash: string;
      imageUri: string;
      attributesUri: string;
      owner: string;
      contract: string;
    };
    error?: string;
  }
  
  export interface EmotionNFTMetadata {
    name: string;
    description: string;
    imageUri: string;
    emotions: Emotion[];
  }