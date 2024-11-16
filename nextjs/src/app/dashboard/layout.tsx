// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import { Header } from "./header";
import { SideNav } from "@/components/sidenav";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { useSidebar } from "@/providers/sidebar-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WagmiProvider, createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { Chain } from "viem";

// Define the chain configuration
const chain: Chain = {
  id: 84532, // Base Sepolia chain ID
  name: 'Base Sepolia',
  // network: 'base-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { 
      http: ['https://sepolia.base.org']
    },
    public: {
      http: ['https://sepolia.base.org']
    }
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://sepolia.basescan.org'
    },
  },
  testnet: true
};

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'CDP AgentKit Demo',
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});

const DashboardContent = ({ children }: { children: ReactNode }) => {
  const { state } = useSidebar();

  return (
    <main
      className={`flex-1 transition-all duration-300 ease-in-out ${
        state === "expanded" ? "ml-56" : "ml-16"
      }`}
    >
      {children}
    </main>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <OnchainKitProvider chain={chain}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen bg-background">
              <SideNav />
              <div className="flex-1">
                <Header showMintAgent={true} />
                <DashboardContent>{children}</DashboardContent>
              </div>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </OnchainKitProvider>
    </WagmiProvider>
  );
}