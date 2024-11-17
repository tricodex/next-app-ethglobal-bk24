// src/app/api/nft/upload-metadata/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const AKAVE_API = 'http://54.242.102.133:8000';
const BUCKET_NAME = 'myBucket3';

interface Emotion {
  name: string;
  value: number;
}

interface MetadataRequest {
  emotions: Emotion[];
  imageUri: string;
  name: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MetadataRequest = await request.json();
    
    // Create metadata JSON
    const metadata = {
      name: body.name,
      description: body.description || 'Emotion NFT',
      image: body.imageUri,
      attributes: body.emotions.map(emotion => ({
        trait_type: 'Emotion',
        emotion: emotion.name,
        value: emotion.value
      }))
    };

    // Convert to Blob instead of Buffer
    const metadataBlob = new Blob(
      [JSON.stringify(metadata)],
      { type: 'application/json' }
    );

    // Create form data
    const formData = new FormData();
    formData.append('file', metadataBlob, 'metadata.json');

    // Use axios with proper headers
    const response = await axios.post(
      `${AKAVE_API}/buckets/${BUCKET_NAME}/files`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return NextResponse.json({
      success: true,
      attributesUri: response.data.ipfsUri
    });

  } catch (error) {
    console.error('Error uploading metadata:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload metadata',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}