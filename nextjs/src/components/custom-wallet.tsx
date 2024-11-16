// src/components/custom-wallet.tsx
"use client";

import { useEffect, useState } from 'react';
import { 
  Wallet, 
  WalletDropdown,
  ConnectWallet,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownDisconnect
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Name,
  Address,
  Identity,
  EthBalance
} from '@coinbase/onchainkit/identity';
import { NFTCard } from '@coinbase/onchainkit/nft';
import { NFTMedia, NFTTitle } from '@coinbase/onchainkit/nft/view';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import { Settings, Wallet as WalletIcon } from 'lucide-react';
import Link from 'next/link';

export function CustomWallet() {
  const { address } = useAccount();
  const [agentProfile, setAgentProfile] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgentProfile = async () => {
      if (address) {
        try {
          // Example - replace with actual NFT fetching logic
          // const nft = await fetchUserNFT(address);
          // setAgentProfile(nft?.tokenId);
        } catch (error) {
          console.error('Error fetching agent profile:', error);
          setAgentProfile(null);
        }
      }
    };

    fetchAgentProfile();
  }, [address]);

  return (
    <Wallet>
      <ConnectWallet className={cn(
        "flex items-center gap-3 px-4 py-2",
        "bg-gradient-to-r from-zinc-900 to-zinc-800",
        "hover:from-zinc-800 hover:to-zinc-700",
        "border border-zinc-700/50",
        "rounded-lg shadow-lg",
        "transition-all duration-200"
      )}>
        <Avatar className="h-8 w-8 rounded-full ring-2 ring-[#FFD700]/20" />
        <div className="flex flex-col">
          <Name className="font-semibold text-white truncate" />
          <EthBalance className="text-sm text-zinc-400" />
        </div>
      </ConnectWallet>

      <WalletDropdown className={cn(
        "mt-2 min-w-[320px]",
        "bg-[#0A0A0A]/95 backdrop-blur-md",
        "border border-zinc-800/50",
        "rounded-xl shadow-xl",
        "divide-y divide-zinc-800/50"
      )}>
        <Identity 
          className="p-4" 
          hasCopyAddressOnClick
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-full ring-2 ring-[#FFD700]/20" />
            <div className="flex-1 min-w-0">
              <Name className="font-bold text-white truncate" />
              <Address className="text-sm text-zinc-400 truncate" />
              <EthBalance className="text-sm text-zinc-500" />
            </div>
          </div>

          {agentProfile && (
            <NFTCard
              contractAddress="0xccd02527118641a9623Ae433D070c6cbE2C5773e"
              tokenId={agentProfile}
              className="mt-4"
            >
              <div className="space-y-4">
                <NFTMedia square={false} className="w-full rounded-lg overflow-hidden" />
                <NFTTitle className="text-lg font-semibold text-white" />
              </div>
            </NFTCard>
          )}
        </Identity>

        <div className="p-2 space-y-1">
          <WalletDropdownBasename 
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg",
              "text-zinc-400 hover:text-white",
              "hover:bg-white/5 transition-colors"
            )}
          />

          <WalletDropdownFundLink
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg",
              "text-zinc-400 hover:text-white",
              "hover:bg-white/5 transition-colors"
            )}
            icon={<WalletIcon className="w-4 h-4 mr-2" />}
          />

          <Link
            href="/settings"
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg",
              "text-zinc-400 hover:text-white",
              "hover:bg-white/5 transition-colors"
            )}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </div>

        <div className="p-2">
          <WalletDropdownDisconnect 
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg",
              "text-red-500 hover:text-red-400",
              "hover:bg-red-500/10 transition-colors"
            )}
          />
        </div>
      </WalletDropdown>
    </Wallet>
  );
}