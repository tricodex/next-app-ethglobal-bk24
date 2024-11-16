// src/app/api/nft/mint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import {  RUNEREUM_NFT_ABI } from '@/constants/contracts';





const NFT_CONTRACT_ADDRESS = '0xccd02527118641a9623Ae433D070c6cbE2C5773e';
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const RPC_URL = process.env.RPC_URL!;

export async function POST(request: NextRequest) {
  try {
    const { imageUri, attributesUri, recipientAddress } = await request.json();

    if (!imageUri || !attributesUri || !recipientAddress) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Setup provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const nftContract = new ethers.Contract(
      NFT_CONTRACT_ADDRESS,
      RUNEREUM_NFT_ABI,
      wallet
    );

    // Mint NFT
    const mintTx = await nftContract.mint(recipientAddress);
    const receipt = await mintTx.wait();
    
    // Get tokenId from events
    const mintEvent = receipt.events?.find((e: { event: string; }) => e.event === 'Transfer');
    const tokenId = mintEvent?.args?.[2];

    // Set URIs
    const setUrisTx = await nftContract.setUris(tokenId, imageUri, attributesUri);
    await setUrisTx.wait();

    return NextResponse.json({
      success: true,
      tokenId: tokenId.toString(),
      transactionHash: setUrisTx.hash,
      imageUri,
      attributesUri
    });

  } catch (error) {
    console.error('Error minting NFT:', error);
    return NextResponse.json(
      { error: 'Failed to mint NFT' },
      { status: 500 }
    );
  }
}

// Type definitions
// interface MintRequest {
//     imageUri: string;
//     attributesUri: string;
//     recipientAddress: string;
//   }
  
//   interface MintResponse {
//     success: boolean;
//     data?: {
//       tokenId: string;
//       mintTxHash: string;
//       setUrisTxHash: string;
//       imageUri: string;
//       attributesUri: string;
//       owner: string;
//       contract: string;
//     };
//     error?: string;
//     details?: string;
//   }