// src/types/agent.ts
export interface AgentCapability {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
  }
  
  export interface Chain {
    id: string;
    name: string;
    chainId: number;
    icon: React.ElementType;
    testnet?: boolean;
  }
  
  export interface AgentConfig {
    name: string;
    ticker: string;
    chain: string;
    capabilities: string[];
    behavior: string;
    image?: File;
    twitterLink?: string;
    telegramLink?: string;
    youtubeLink?: string;
    website?: string;
  }