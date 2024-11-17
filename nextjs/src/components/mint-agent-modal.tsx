"use client";

import { useCallback, useState } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from 'wagmi';
import { cn } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Loader2, Zap } from 'lucide-react';
import Image from 'next/image';

interface MintAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MintAgentModal({ isOpen, onClose }: MintAgentModalProps) {
  const { toast } = useToast();
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  // NFT Contract details
  const contractConfig = {
    contractAddress: '0xccd02527118641a9623Ae433D070c6cbE2C5773e' as `0x${string}`,
    onlyOwner: false // Allow any connected wallet to mint
  };

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    switch (status.statusName) {
      case 'success':
        setIsLoading(false);
        toast({
          title: "Success!",
          description: "Agent NFT minted successfully. Your agent profile is being created...",
        });
        onClose();
        break;
      case 'error':
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to mint Agent NFT. Please try again.",
          variant: "destructive",
        });
        break;
      case 'mediaLoading':
        setIsLoading(true);
        break;
      case 'transactionPending':
        toast({
          title: "Transaction Pending",
          description: "Please wait while we mint your agent NFT...",
        });
        break;
    }
  }, [toast, onClose]);

  if (!address) {
    return null;
  }

  const buttonClassName = cn(
    "w-full py-4 rounded-lg font-bold",
    "bg-gradient-to-r from-[#FFD700] to-[#FFA500]",
    "text-black transition-all duration-200",
    "hover:scale-[1.02] hover:shadow-lg",
    "disabled:opacity-50 disabled:hover:scale-100",
    "flex items-center justify-center gap-2"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "max-w-[480px] bg-[#0A0A0A]/95 border-zinc-800",
        "backdrop-blur-lg shadow-xl",
        "rounded-xl overflow-hidden"
      )}>
        <div className="fixed inset-0 pointer-events-none">
          <Image
            src="/modal-bg1.png"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <DialogHeader className="relative z-10">
          <DialogTitle className={cn(
            "text-2xl brand-text text-center",
            "bg-gradient-to-r from-[#FFD700] to-[#FFA500]",
            "bg-clip-text text-transparent font-bold"
          )}>
            Mint Rune Agent
          </DialogTitle>
        </DialogHeader>

        <NFTMintCard
          contractAddress={contractConfig.contractAddress}
          onStatus={handleOnStatus}
          className="relative z-10"
        >
          <div className="space-y-6">
            <NFTCreator className="text-white" />
            
            <NFTMedia 
              square={false} 
              className={cn(
                "rounded-xl overflow-hidden",
                "border border-zinc-800",
                "aspect-square w-full"
              )}
            />
            
            <div className="space-y-4">
              <NFTCollectionTitle className={cn(
                "text-xl font-bold text-white",
                "bg-zinc-900/50 rounded-lg p-4"
              )} />

              <div className="flex items-center gap-4">
                <NFTQuantitySelector className={cn(
                  "flex-1 bg-zinc-900/50 rounded-lg p-4",
                  "text-white border border-zinc-800"
                )} />
                
                <NFTAssetCost className={cn(
                  "flex-1 bg-zinc-900/50 rounded-lg p-4",
                  "text-white border border-zinc-800"
                )} />
              </div>

              <NFTMintButton 
                className={buttonClassName}
                label="Mint Agent"
                pendingOverride={{
                  text: "Minting..."
                }}
              />
            </div>
          </div>
        </NFTMintCard>
      </DialogContent>
    </Dialog>
  );
}