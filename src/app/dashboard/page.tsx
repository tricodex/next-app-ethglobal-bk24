// src/app/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Brain, 
  ChartBar, 
//   Users, 
//   Wallet, 
  Star, 
  Zap, 
  Activity, 
  TrendingUp, 
  Network,
  Coins
} from 'lucide-react';
import Image from 'next/image';

interface Agent {
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
}

const agents: Agent[] = [
  {
    id: 1,
    name: "Luna AI",
    ticker: "$LUNA",
    marketCap: "$119m",
    change24h: "+90.58%",
    intelligence: 4193,
    profileImage: "/profiles/p1.png",
    description: "Advanced AI agent specializing in market analysis and predictive trading",
    badge: "Top Performer",
    performance: "98.5%"
  },
  {
    id: 2,
    name: "Nebula",
    ticker: "$NEBL",
    marketCap: "$87m",
    change24h: "+45.2%",
    intelligence: 3891,
    profileImage: "/profiles/p2.png",
    description: "Specialized in cross-chain arbitrage and liquidity optimization",
    badge: "Rising Star"
  },
  {
    id: 3,
    name: "Quantum",
    ticker: "$QNTM",
    marketCap: "$64m",
    change24h: "+31.8%",
    intelligence: 3654,
    profileImage: "/profiles/p3.png",
    description: "Quantum-inspired algorithms for high-frequency trading",
    performance: "94.2%"
  },
  {
    id: 4,
    name: "Atlas",
    ticker: "$ATLS",
    marketCap: "$52m",
    change24h: "+28.4%",
    intelligence: 3542,
    profileImage: "/profiles/p4.png",
    description: "Global market analysis and multi-strategy execution",
    badge: "Innovative"
  },
  {
    id: 5,
    name: "Zenith",
    ticker: "$ZTH",
    marketCap: "$43m",
    change24h: "+22.9%",
    intelligence: 3421,
    profileImage: "/profiles/p5.png",
    description: "Balanced portfolio management with risk optimization"
  },
  {
    id: 6,
    name: "Helios",
    ticker: "$HLS",
    marketCap: "$38m",
    change24h: "+19.6%",
    intelligence: 3298,
    profileImage: "/profiles/p6.png",
    description: "Solar-powered sustainable trading infrastructure"
  }
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen p-8 bg-[#0A0A0A]">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 font-audiowide">Agent Network</h1>
            <p className="text-zinc-400">Monitor and manage your AI trading agents</p>
          </div>
          <Button 
            className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-6"
            onClick={() => setIsModalOpen(true)}
          >
            <Zap className="mr-2 h-4 w-4" />
            Deploy Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Network Agents",
              value: "1,234",
              icon: Brain,
              change: "+12.5%",
              description: "Active AI agents"
            },
            {
              title: "Total Value Locked",
              value: "$345M",
              icon: ChartBar,
              change: "+23.4%",
              description: "Combined assets"
            },
            {
              title: "Daily Transactions",
              value: "45.2K",
              icon: Activity,
              change: "+8.2%",
              description: "24h volume"
            },
            {
              title: "Network Growth",
              value: "+127%",
              icon: TrendingUp,
              change: "+15.7%",
              description: "Monthly increase"
            }
          ].map((stat, i) => (
            <Card key={i} className="bg-[#111111] border-zinc-800 animate-fade-scale [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-[#FFD700]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-xs text-zinc-400 mt-1">
                  <span className="text-emerald-400">{stat.change}</span> {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-[#111111] border-zinc-800 text-white placeholder:text-zinc-500"
          />
          <Button variant="outline" className="border-zinc-800 text-zinc-700 hover:bg-zinc-600">
            <Star className="mr-2 h-4 w-4 text-[#FFD700]" />
            Top Rated
          </Button>
          <Button variant="outline" className="border-zinc-800 text-zinc-700 hover:bg-zinc-600">
            <TrendingUp className="mr-2 h-4 w-4 text-[#FFD700]" />
            Trending
          </Button>
          <Button variant="outline" className="border-zinc-800 text-zinc-700 hover:bg-zinc-600">
            <Activity className="mr-2 h-4 w-4 text-[#FFD700]" />
            Most Active
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="bg-[#111111] border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-[#FFD700]/5 transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={agent.profileImage}
                  alt={agent.name}
                  fill
                  className="object-cover"
                />
                {agent.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD700] text-black">
                    {agent.badge}
                  </span>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                    <p className="text-sm text-[#FFD700]">{agent.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{agent.marketCap}</p>
                    <p className="text-sm text-emerald-400">{agent.change24h}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                  {agent.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-sm font-medium text-zinc-300">
                      IQ: {agent.intelligence}
                    </span>
                  </div>
                  {agent.performance && (
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-400">
                        {agent.performance}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[#0A0A0A]/95 border-zinc-800">
          <div className="fixed inset-0 pointer-events-none">
            <Image
              src="/modal-bg1.png"
              alt="Background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-3xl font-audiowide text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Deploy Your AI Agent
            </DialogTitle>
          </DialogHeader>

          <div className="relative z-10 mt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Agent Name</label>
                <Input 
                  placeholder="Enter a unique name..."
                  className="bg-[#111111] border-zinc-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Base Model</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'gpt4', name: 'GPT-4 Turbo', icon: Brain },
                    { id: 'claude', name: 'Claude 3', icon: Brain },
                  ].map((model) => (
                    <Button
                      key={model.id}
                      variant="outline"
                      className="border-zinc-700 bg-[#111111] hover:bg-[#1a1a1a] h-24 flex flex-col items-center justify-center gap-2"
                    >
                      <model.icon className="h-8 w-8 text-[#FFD700]" />
                      <span className="text-white">{model.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Chain</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'base', name: 'Base Sepolia', selected: true },
                    { id: 'op', name: 'Optimism' },
                    { id: 'arb', name: 'Arbitrum' },
                  ].map((chain) => (
                    <Button
                      key={chain.id}
                      variant="outline"
                      className={`border-zinc-700 ${
                        chain.selected 
                          ? 'bg-[#FFD700] text-black' 
                          : 'bg-[#111111] text-white hover:bg-[#1a1a1a]'
                      }`}
                    >
                      <Network className="mr-2 h-4 w-4" />
                      {chain.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Capabilities</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'trade', name: 'Trading', icon: Coins },
                    { id: 'analyze', name: 'Market Analysis', icon: Brain },
                    { id: 'automate', name: 'Task Automation', icon: Zap },
                    { id: 'interact', name: 'Social Interaction', icon: Network },
                  ].map((capability) => (
                    <Button
                      key={capability.id}
                      variant="outline"
                      className="border-zinc-700 bg-[#111111] hover:bg-[#1a1a1a] justify-start"
                    >
                      <capability.icon className="mr-2 h-4 w-4 text-[#FFD700]" />
                      <span className="text-white">{capability.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Behavior Description</label>
                <Textarea 
                  placeholder="Describe how your agent should behave..."
                  className="bg-[#111111] border-zinc-700 text-white h-24"
                />
              </div>

              <div className="pt-4">
                <Button className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  Deploy Agent
                </Button>
                <p className="text-xs text-zinc-400 text-center mt-2">
                  Deployment requires a small gas fee on Base Sepolia
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}