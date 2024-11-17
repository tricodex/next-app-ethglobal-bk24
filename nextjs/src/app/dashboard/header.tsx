// src/app/dashboard/header.tsx
"use client";

import Link from "next/link";
import { 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect,
  ConnectWallet,
  WalletDropdownBasename,
  WalletDropdownFundLink
} from '@coinbase/onchainkit/wallet';
import { 
  Avatar, 
  Name, 
  Address, 
  Identity,
  EthBalance 
} from '@coinbase/onchainkit/identity';
import { Bell, Settings, Wallet as WalletIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/40 bg-black/95 backdrop-blur-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-2",
            "text-xl font-bold text-[#FFD700]",
            "hover:opacity-80 transition-opacity"
          )}
        >
          <span className="brand-text">Runereum</span>
        </Link>

        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-zinc-400 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#FFD700] animate-pulse" />
          </Button>

          <Wallet className="mt-2 mb-2">
            <ConnectWallet className={cn(
              "items-center gap-3 px-4",
              "bg-white/5 hover:bg-white/10",
              "rounded-lg border border-zinc-800",
              "transition-all duration-200"
            )}>
              <Avatar className="h-6 w-6" />
              <div className="flex flex-col">
                <Name className="font-semibold text-white" />
                <EthBalance className="text-sm text-zinc-400" />
              </div>
            </ConnectWallet>
            
            <WalletDropdown className={cn(
              "mt-2 min-w-[400px]",
              "rounded-lg border border-zinc-800",
              "bg-black/95 backdrop-blur-sm",
              "shadow-xl shadow-black/20"
            )}>
              <Identity 
                className="px-4 pt-3 pb-2 hover:bg-white/5" 
                hasCopyAddressOnClick
              >
                <div className="flex items-center gap-3 pb-2">
                  <Avatar className="h-10 w-10" />
                  <div className="flex-1 overflow-hidden">
                    <Name className="font-semibold text-white" />
                    <Address className="text-sm text-zinc-400" />
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-800">
                  <EthBalance className="text-sm text-zinc-400" />
                </div>
              </Identity>
              
              <WalletDropdownBasename className="px-4 py-2 hover:bg-white/5 text-zinc-400" />
              
              <WalletDropdownFundLink 
                className="flex items-center px-4 py-2 text-zinc-400 hover:bg-white/5 hover:text-white"
                icon={<WalletIcon className="mr-2 h-4 w-4" />}
              />
              
              <Link 
                href="/dashboard/settings" 
                className={cn(
                  "flex items-center px-4 py-2",
                  "text-zinc-400 hover:bg-white/5 hover:text-white",
                  "transition-colors"
                )}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              
              <WalletDropdownDisconnect 
                className={cn(
                  "flex items-center px-4 py-2",
                  "text-red-500 hover:text-red-400",
                  "hover:bg-red-500/10 transition-colors"
                )}
              />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </header>
  );
}