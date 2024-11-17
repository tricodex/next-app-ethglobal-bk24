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

  // src/types/agent.ts
export interface Agent {
  id: number;
  name: string;
  ticker: string;
  marketCap: string;
  change24h: string;
  intelligence: number;
  profileImage: string;
  description: string;
  badge?: string;
  performance?: string;
  status: 'active' | 'paused' | 'stopped';
  schema: {
    properties: {
      name: string;
      ticker: string;
      chain?: string;
      capabilities?: string[];
      behavior: string;
    };
  }
  logs: {
    timestamp: string;
    message: string;
    type: 'info' | 'error' | 'success';
  }[];
  code: string;
  socialLinks?: {
    twitter?: string;
    telegram?: string;
    youtube?: string;
    website?: string;
  };
  chain?: string;
  capabilities?: string[];
  behavior?: string;
}