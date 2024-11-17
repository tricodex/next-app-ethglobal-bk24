// src/components/nft-minter.tsx
"use client";

import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { 
  NFTCreator, 
  NFTCollectionTitle, 
  NFTQuantitySelector, 
  NFTAssetCost, 
  NFTMintButton 
} from '@coinbase/onchainkit/nft/mint';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import type { LifecycleStatus } from '@coinbase/onchainkit/nft';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const CONTRACT_ADDRESS = '0xccd02527118641a9623Ae433D070c6cbE2C5773e';

export function NFTMinter() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatus = (status: LifecycleStatus) => {
    switch (status.statusName) {
      case 'success':
        toast({
          title: "Success!",
          description: "Your Runereum NFT has been minted successfully!",
        });
        setIsLoading(false);
        break;
      case 'error':
        if (status.statusData) {
          toast({
            title: "Error",
            description: status.statusData.message || "Failed to mint NFT",
            variant: "destructive",
          });
        }
        setIsLoading(false);
        break;
      case 'transactionPending':
        setIsLoading(true);
        toast({
          title: "Processing",
          description: "Your NFT is being minted...",
        });
        break;
    }
  };

  return (
    <NFTMintCard
      contractAddress={CONTRACT_ADDRESS}
      onStatus={handleStatus}
      className={cn(
        "max-w-md mx-auto rounded-xl overflow-hidden",
        "bg-black/40 border border-zinc-800",
        "backdrop-blur-sm shadow-xl"
      )}
    >
      <div className="p-6 space-y-6">
        <NFTCreator />
        <NFTMedia 
          square={false} 
          className="w-full aspect-square rounded-lg overflow-hidden"
        />
        <NFTCollectionTitle className="text-xl font-bold text-white" />
        <NFTQuantitySelector />
        <NFTAssetCost className="text-zinc-400" />
        <NFTMintButton 
          className={cn(
            "w-full bg-[#FFD700] hover:bg-[#FFC700]",
            "text-black font-bold py-3 rounded-lg",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={isLoading}
        />
      </div>
    </NFTMintCard>
  );
}