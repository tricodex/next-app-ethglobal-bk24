// src/app/api/nft/upload-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

const AKAVE_API = 'http://54.242.102.133:8000';
const BUCKET_NAME = 'myBucket3';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create form data for Akave
    const akaveFormData = new FormData();
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    
    akaveFormData.append('file', fileBuffer, {
      filename: file.name,
      contentType: file.type,
    });

    // Upload to Akave
    const response = await axios.post(
      `${AKAVE_API}/buckets/${BUCKET_NAME}/files`,
      akaveFormData,
      {
        headers: {
          ...akaveFormData.getHeaders(),
        },
      }
    );

    // Return the IPFS URI
    return NextResponse.json({
      success: true,
      imageUri: response.data.ipfsUri
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}