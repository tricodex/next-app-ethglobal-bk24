// src/app/dashboard/header.tsx
"use client";

import { useCallback, useState } from 'react';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { NFTMintCard, NFTMintCardDefault } from '@coinbase/onchainkit/nft';
import { Transaction, TransactionButton } from '@coinbase/onchainkit/transaction';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { Bell, Settings, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

interface HeaderProps {
  showMintAgent?: boolean;
}

export function Header({ showMintAgent = false }: HeaderProps) {
  const { toast } = useToast();
  const [showNFTMint, setShowNFTMint] = useState(false);

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    if (status.statusName === 'success') {
      toast({
        title: "Success!",
        description: "Agent NFT minted successfully",
      });
    } else if (status.statusName === 'error') {
      toast({
        title: "Error",
        description: "Failed to mint Agent NFT",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            {showMintAgent && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-4"
                onClick={() => setShowNFTMint(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Mint Agent
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
            </Button>

            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
                <EthBalance className="ml-2" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <Link href="/dashboard/settings" className="flex items-center px-4 py-2 hover:bg-accent">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </div>

      {showNFTMint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[480px] rounded-lg bg-background p-6">
            <NFTMintCardDefault
              contractAddress="0xb4703a3a73aec16e764cbd210b0fde9efdab8941"
              onStatus={handleOnStatus}
            />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => setShowNFTMint(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}