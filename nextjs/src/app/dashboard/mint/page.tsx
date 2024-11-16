// src/app/dashboard/mint/page.tsx
"use client";

import { useState } from 'react';
import { useAccount } from 'wagmi';

// Type definitions
interface Emotion {
  name: string;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MintError {
  message: string;
  code?: string;
}

interface MintResult {
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

export default function MintPage() {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded emotions in the correct format
  const PRESET_EMOTIONS: Emotion[] = [
    { name: "Happy", value: 85 },
    { name: "Excited", value: 92 },
    { name: "Peaceful", value: 78 }
  ];

  const handleMint = async () => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Create a Blob from the image path
      const imageResponse = await fetch('/profiles/p10.png');
      const imageBlob = await imageResponse.blob();

      // 1. Upload image to Akave
      const imageFormData = new FormData();
      imageFormData.append('file', imageBlob, 'emotion-nft.png');

      const uploadImgResponse = await fetch('/api/nft/upload-image', {
        method: 'POST',
        body: imageFormData
      });
      
      if (!uploadImgResponse.ok) {
        const error = await uploadImgResponse.json();
        throw new Error(error.message || 'Failed to upload image');
      }
      
      const { imageUri } = await uploadImgResponse.json();

      // 2. Upload metadata 
      const metadataResponse = await fetch('/api/nft/upload-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotions: PRESET_EMOTIONS,
          imageUri,
          name: 'Emotion NFT #1',
          description: 'A unique NFT representing emotional state data'
        })
      });

      if (!metadataResponse.ok) {
        const error = await metadataResponse.json();
        throw new Error(error.message || 'Failed to upload metadata');
      }

      const { attributesUri } = await metadataResponse.json();

      // 3. Mint the NFT
      const mintResponse = await fetch('/api/nft/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUri,
          attributesUri,
          recipientAddress: address
        })
      });

      if (!mintResponse.ok) {
        const error = await mintResponse.json();
        throw new Error(error.message || 'Failed to mint NFT');
      }

      const mintResult = await mintResponse.json() as MintResult;

      // Handle success
      console.log('NFT minted successfully:', mintResult);
      
      // You could add a success message state here
      setError(null);

    } catch (err) {
      console.error('Error minting NFT:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mint Your Emotion NFT</h1>
        
        {/* Preview Image */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">NFT Preview</h2>
          <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profiles/p10.png" 
              alt="NFT Preview" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Emotions Preview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Emotions Data</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {PRESET_EMOTIONS.map((emotion, index) => (
              <div 
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium text-gray-700">{emotion.name}</span>
                <span className="text-gray-600">{emotion.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Mint Button */}
        <button
          onClick={handleMint}
          disabled={isLoading || !address}
          className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
            text-white font-semibold text-lg shadow-lg transition-all
            ${isLoading || !address 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'
            }`}
        >
          {!address ? 'Connect Wallet to Mint' :
           isLoading ? 'Minting...' : 'Mint NFT'}
        </button>

        {/* Wallet Status */}
        {!address && (
          <p className="mt-4 text-center text-gray-600">
            Please connect your wallet to mint an NFT
          </p>
        )}
      </div>
    </div>
  );
}