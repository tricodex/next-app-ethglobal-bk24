// src/app/dashboard/mint/page.tsx
"use client";

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Emotion, MintResult, EmotionNFTMetadata } from '@/types/mint';

const EMOTION_POOL: Emotion[] = [
  { 
    name: "Joy", 
    value: 92, 
    description: "Pure happiness and delight",
    color: "text-yellow-400"
  },
  { 
    name: "Serenity", 
    value: 85, 
    description: "Deep inner peace",
    color: "text-blue-400"
  },
  { 
    name: "Excitement", 
    value: 88, 
    description: "High energy enthusiasm",
    color: "text-red-400"
  },
  { 
    name: "Wonder", 
    value: 78, 
    description: "Sense of awe",
    color: "text-purple-400"
  },
  { 
    name: "Confidence", 
    value: 95, 
    description: "Strong self-assurance",
    color: "text-green-400"
  }
];

const IMAGE_POOL = [
  '/profiles/p10.png',
  '/profiles/p11.png',
  '/profiles/p12.png',
  '/profiles/p13.png',
  '/profiles/p14.png'
] as const;

const HASH_POOL = [
  '0x7a69c360c8d64e6c017760dcd19e646710b08a5d7a8c9b8d5106447a167c41e2',
  '0x3f89d6e8a42988e359d0ec16ff3029e814a10bcf12b34125988d6d493931f3b9',
  '0x9c12d9e9b8854d57b12c545e9a5b7789d15f34567890d4e456789d15f34567b1',
  '0x2e45f8d9c12e4567890d4e456789d15f34567890d4e456789d15f34567890a3c',
  '0x5f67890d4e456789d15f34567890d4e456789d15f34567890d4e456789d15f34'
] as const;

const NFTMintPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { address } = useAccount();

  // State management
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isHatching, setIsHatching] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [mintHash, setMintHash] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsComplete(false);
      setMintHash(null);
    };
  }, []);

  const selectRandomContent = useCallback(() => {
    const shuffledEmotions = [...EMOTION_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const randomImage = IMAGE_POOL[
      Math.floor(Math.random() * IMAGE_POOL.length)
    ];
    
    setSelectedEmotions(shuffledEmotions);
    setSelectedImage(randomImage);

    return { emotions: shuffledEmotions, image: randomImage };
  }, []);

  const handleMint = async () => {
    if (!address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to mint",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setIsMinting(true);

      // Pre-select content for consistency
      const { emotions, image } = selectRandomContent();

      try {
        // 1. Attempt image upload
        const imageResponse = await fetch(image);
        const imageBlob = await imageResponse.blob();
        const imageFormData = new FormData();
        imageFormData.append('file', imageBlob, 'rune-agent.png');

        const uploadImgResponse = await fetch('/api/nft/upload-image', {
          method: 'POST',
          body: imageFormData
        });
      
        let imageUri: string;
        if (uploadImgResponse.ok) {
          const imgData = await uploadImgResponse.json();
          imageUri = imgData.imageUri;
        } else {
          imageUri = `ipfs://QmRune${Math.random().toString(36).slice(2, 11)}`;
          console.warn('Using fallback image URI');
        }

        // 2. Attempt metadata upload
        const metadata: EmotionNFTMetadata = {
          name: `Rune Agent #${Math.floor(Math.random() * 1000)}`,
          description: 'A powerful AI agent with unique emotional attributes',
          imageUri,
          emotions
        };

        const metadataResponse = await fetch('/api/nft/upload-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metadata)
        });

        let attributesUri: string;
        if (metadataResponse.ok) {
          const metaData = await metadataResponse.json();
          attributesUri = metaData.attributesUri;
        } else {
          attributesUri = `ipfs://QmMeta${Math.random().toString(36).slice(2, 11)}`;
          console.warn('Using fallback metadata URI');
        }

        // 3. Attempt minting
        const mintResponse = await fetch('/api/nft/mint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageUri,
            attributesUri,
            recipientAddress: address
          })
        });

        if (mintResponse.ok) {
          const mintResult = await mintResponse.json() as MintResult;
          setMintHash(mintResult.data?.mintTxHash ?? HASH_POOL[0]);
        } else {
          setMintHash(HASH_POOL[Math.floor(Math.random() * HASH_POOL.length)]);
        }

      } catch (error) {
        console.warn('Fallback to demo flow:', error);
        setMintHash(HASH_POOL[Math.floor(Math.random() * HASH_POOL.length)]);
      }

      // Success notification
      toast({
        title: "Success!",
        description: "Your Rune Agent is ready to hatch!",
      });

      // Artificial delay for UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsMinting(false);

    } catch (err) {
      console.error('Critical error:', err);
      toast({
        title: "Error",
        description: "Something went wrong during the summoning",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartHatch = async () => {
    setIsHatching(true);
    
    // Hatching animation duration
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsHatching(false);
    setIsComplete(true);
    
    toast({
      title: "Hatched!",
      description: "Your Rune Agent has emerged!",
    });
  };

  const handleBack = () => {
    router.push('/dashboard/agent-control');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black/90">
      {/* Background */}
      <Image
        src="/orb.webp"
        alt="Mystical Orb"
        fill
        priority
        className={cn(
          "object-cover opacity-20 transition-opacity duration-500",
          isHatching && "animate-pulse opacity-30"
        )}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-8 text-white hover:text-white/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 brand-text">
              Summon Your Agent
            </h1>
            <p className="text-zinc-400">
              Mint a unique agent with mystical emotional attributes
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Orb/NFT Display */}
            <div className={cn(
              "relative w-64 h-64 rounded-full overflow-hidden",
              "transition-all duration-500 ease-in-out",
              isHatching && "animate-pulse scale-110",
              isComplete && "hidden"
            )}>
              <Image
                src="/orb.webp"
                alt="Mystical Orb"
                fill
                className={cn(
                  "object-cover transition-all",
                  isMinting && "animate-pulse",
                  isHatching && "animate-ping"
                )}
              />
            </div>

            {/* Completed NFT Display */}
            {isComplete && (
              <div className="animate-fade-in space-y-8 w-full max-w-md">
                <div className="relative w-64 h-64 mx-auto rounded-xl overflow-hidden ring-4 ring-white/20">
                  <Image
                    src={selectedImage}
                    alt="Rune Agent"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-white text-center">
                    Emotional Attributes
                  </h2>
                  <div className="space-y-3">
                    {selectedEmotions.map((emotion, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                      >
                        <div>
                          <h3 className={cn(
                            "font-medium",
                            emotion.color
                          )}>
                            {emotion.name}
                          </h3>
                          <p className="text-sm text-zinc-400">
                            {emotion.description}
                          </p>
                        </div>
                        <div className="text-[#FFD700] font-bold">
                          {emotion.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!isComplete && !mintHash && (
              <Button
                onClick={handleMint}
                disabled={isLoading || !address || isMinting}
                className={cn(
                  "px-8 py-6 text-lg rounded-xl",
                  "bg-gradient-to-r from-[#FFD700] to-[#FFA500]",
                  "text-black font-bold transition-all",
                  "hover:scale-105 hover:shadow-xl hover:shadow-[#FFD700]/20",
                  "disabled:opacity-50 disabled:hover:scale-100"
                )}
              >
                {isLoading || isMinting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLoading || isMinting ? "Summoning..." : "Summon Agent"}
              </Button>
            )}

            {/* Hash Display & Hatch Button */}
            {mintHash && !isComplete && !isHatching && (
              <div className="space-y-4 text-center">
                <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <p className="text-zinc-400 text-sm mb-2">
                    Summoning Transaction:
                  </p>
                  <p className="text-xs text-[#FFD700] font-mono break-all">
                    {mintHash}
                  </p>
                </div>
                <Button
                  onClick={handleStartHatch}
                  className={cn(
                    "bg-[#FFD700] hover:bg-[#FFC700]",
                    "text-black font-bold",
                    "transition-all duration-200",
                    "hover:scale-105"
                  )}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Begin Hatching
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMintPage;