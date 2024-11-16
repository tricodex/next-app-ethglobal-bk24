// src/lib/constants/agent.ts
import { Brain, Network, Coins, Bot } from 'lucide-react';
import { AgentCapability, Chain } from '@/types/agent';

export const SUPPORTED_CAPABILITIES: AgentCapability[] = [
  {
    id: 'trade',
    name: 'Trading',
    icon: Coins,
    description: 'Execute trades and manage positions'
  },
  {
    id: 'analyze',
    name: 'Market Analysis',
    icon: Brain,
    description: 'Analyze market data and trends'
  },
  {
    id: 'automate',
    name: 'Task Automation',
    icon: Bot,
    description: 'Automate repetitive tasks'
  },
  {
    id: 'interact',
    name: 'Social Interaction',
    icon: Network,
    description: 'Interact with other agents and users'
  }
];

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 'base-sepolia',
    name: 'Base Sepolia',
    chainId: 84532,
    icon: Network,
    testnet: true
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    icon: Network
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    chainId: 42161,
    icon: Network
  }
];