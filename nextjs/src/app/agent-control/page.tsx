/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/agent-control/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DeployAgentModal } from '@/components/deploy-agent-modal';
import { 
  Brain, 
  ChartBar, 
  Star, 
  Zap, 
  Activity, 
  TrendingUp,
  Power,
  Settings,
  Trash2,
  PauseCircle
} from 'lucide-react';
import Image from 'next/image';
import type { AgentConfig } from '@/types/agent';

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
  status: 'active' | 'paused' | 'stopped';
}

// Keep initial agents data but add status
const initialAgents: Agent[] = [
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
    performance: "98.5%",
    status: 'active'
  },
  // ... (other agents with status added)
];

export default function AgentControl() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleDeploy = async (agentConfig: AgentConfig) => {
    try {
      // Simulate deployment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new agent from config
      const newAgent: Agent = {
        id: agents.length + 1,
        name: agentConfig.name,
        ticker: agentConfig.ticker,
        marketCap: "$0",
        change24h: "+0.00%",
        intelligence: 3000, // Base intelligence
        profileImage: agentConfig.image ? URL.createObjectURL(agentConfig.image) : "/profiles/default.png",
        description: agentConfig.behavior,
        status: 'active'
      };

      setAgents(prev => [...prev, newAgent]);
      setIsDeployModalOpen(false);
    } catch (error) {
      console.error('Error deploying agent:', error);
    }
  };

  const handleStatusChange = (agentId: number, status: Agent['status']) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, status } : agent
    ));
  };

  const handleDeleteAgent = (agentId: number) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-[#0A0A0A]">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 brand-text">Agent Control Center</h1>
          <p className="text-zinc-400">Deploy and manage your AI agents</p>
        </div>
        <Button 
          className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold px-6"
          onClick={() => setIsDeployModalOpen(true)}
        >
          <Zap className="mr-2 h-4 w-4" />
          Summon New Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            title: "Active Agents",
            value: agents.filter(a => a.status === 'active').length.toString(),
            icon: Power,
            description: "Currently running"
          },
          {
            title: "Total Agents",
            value: agents.length.toString(),
            icon: Brain,
            description: "Deployed agents"
          },
          {
            title: "Average Performance",
            value: "92.4%",
            icon: ChartBar,
            description: "Success rate"
          },
          {
            title: "Network Status",
            value: "Optimal",
            icon: Activity,
            description: "System health"
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
              <p className="text-xs text-zinc-400 mt-1">{stat.description}</p>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="bg-[#111111] border-zinc-800 overflow-hidden hover:shadow-xl hover:shadow-[#FFD700]/5 transition-all duration-300">
            <div className="relative h-48">
              <Image
                src={agent.profileImage}
                alt={agent.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {agent.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFD700] text-black">
                    {agent.badge}
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  agent.status === 'active' ? 'bg-emerald-500' : 
                  agent.status === 'paused' ? 'bg-amber-500' : 
                  'bg-red-500'
                } text-white`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </div>
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
              <div className="flex items-center justify-between mb-4">
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
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-zinc-800 hover:bg-zinc-800"
                  onClick={() => handleStatusChange(agent.id, agent.status === 'active' ? 'paused' : 'active')}
                >
                  {agent.status === 'active' ? (
                    <><PauseCircle className="w-4 h-4 mr-2" /> Pause</>
                  ) : (
                    <><Power className="w-4 h-4 mr-2" /> Start</>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-zinc-800 hover:bg-zinc-800"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-zinc-800 hover:bg-zinc-800 hover:text-red-500"
                  onClick={() => handleDeleteAgent(agent.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeployAgentModal 
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeploy}
      />
    </div>
  );
}