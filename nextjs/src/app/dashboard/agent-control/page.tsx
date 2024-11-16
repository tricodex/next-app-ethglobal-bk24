// src/app/agent-control/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DeployAgentModal } from '@/components/deploy-agent-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  ChartBar, 
  Zap, 
  Activity, 
  Power,
  Settings,
  Trash2,
  PauseCircle,
  Terminal,
  Code,
  MessageSquare,
  Bot,
  BarChart3,
  Play,
  Twitter,
  Youtube,
  MessageCircle,
  Link as LinkIcon
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

const defaultAgentCode = `async function handleTrade(context) {
  // Your trading logic here
  const { price, volume } = context;
  
  if (price > previousPrice) {
    return {
      action: 'BUY',
      amount: calculatePosition(price, volume)
    };
  }
  
  return { action: 'HOLD' };
}`;

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
    status: 'active',
    schema: {
      properties: {
        name: "Luna AI",
        ticker: "$LUNA",
        behavior: "Advanced AI agent specializing in market analysis and predictive trading"
      }
    },
    logs: [
      {
        timestamp: "2024-02-16T10:00:00Z",
        message: "Agent initialized successfully",
        type: "success"
      },
      {
        timestamp: "2024-02-16T10:01:00Z",
        message: "Starting market analysis...",
        type: "info"
      }
    ],
    code: defaultAgentCode
  },
  // Add more initial agents here...
];

export default function AgentControl() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'agent', content: string}[]>([]);

  const handleDeploy = async (agentConfig: AgentConfig) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAgent: Agent = {
        id: agents.length + 1,
        name: agentConfig.name,
        ticker: agentConfig.ticker,
        marketCap: "$0",
        change24h: "+0.00%",
        intelligence: 3000,
        profileImage: agentConfig.image ? URL.createObjectURL(agentConfig.image) : "/profiles/default.png",
        description: agentConfig.behavior,
        status: 'active',
        logs: [
          {
            timestamp: new Date().toISOString(),
            message: "Agent initialized successfully",
            type: "success"
          }
        ],
        code: defaultAgentCode,
        schema: {
          properties: {
            name: '',
            ticker: '',
            chain: undefined,
            capabilities: undefined,
            behavior: ''
          }
        }
      };

      setAgents(prev => [...prev, newAgent]);
      setIsDeployModalOpen(false);
    } catch (error) {
      console.error('Error deploying agent:', error);
    }
  };

  const handleStatusChange = (agentId: number, status: Agent['status']) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          logs: [
            ...agent.logs,
            {
              timestamp: new Date().toISOString(),
              message: `Agent status changed to ${status}`,
              type: 'info'
            }
          ],
          status
        };
      }
      return agent;
    }));
  };

  const handleDeleteAgent = (agentId: number) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    if (selectedAgent?.id === agentId) {
      setSelectedAgent(null);
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim() || !selectedAgent) return;

    const userMessage = {
      role: 'user' as const,
      content: currentMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        role: 'agent' as const,
        content: `Processing request: "${currentMessage}". Agent ${selectedAgent.name} is analyzing...`
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleCodeUpdate = (agentId: number, newCode: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? {
            ...agent,
            code: newCode,
            logs: [
              ...agent.logs,
              {
                timestamp: new Date().toISOString(),
                message: "Code updated successfully",
                type: "success"
              }
            ]
          }
        : agent
    ));
  };


  const handleAgentUpdate = (agentId: number, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? { ...agent, ...updates }
        : agent
    ));
  };

  const handleSocialUpdate = (agentId: number, updates: Partial<Agent['socialLinks']>) => {
    setAgents(prev => prev.map(agent =>
      agent.id === agentId
        ? { 
            ...agent, 
            socialLinks: { 
              ...agent.socialLinks,
              ...updates 
            }
          }
        : agent
    ));
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-[#0A0A0A]">
      {/* Header Section */}
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

      {/* Stats Grid */}
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#111111] border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="space-y-4">
            {filteredAgents.map((agent) => (
              <Card 
                key={agent.id} 
                className={`bg-[#111111] border-zinc-800 cursor-pointer transition-all duration-300 ${
                  selectedAgent?.id === agent.id ? 'border-[#FFD700]' : ''
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={agent.profileImage}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                    <p className="text-sm text-[#FFD700]">{agent.ticker}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    agent.status === 'active' ? 'bg-emerald-500' : 
                    agent.status === 'paused' ? 'bg-amber-500' : 
                    'bg-red-500'
                  } text-white`}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Agent Detail View */}
        <div className="lg:col-span-2">
          {selectedAgent ? (
            <Card className="bg-[#111111] border-zinc-800">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="bg-zinc-800/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="apis">Social APIs</TabsTrigger>
                    <TabsTrigger value="logs">Logs</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden">
                        <Image
                          src={selectedAgent.profileImage}
                          alt={selectedAgent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                        <p className="text-zinc-400">{selectedAgent.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-[#FFD700]" />
                            <h3 className="text-sm font-medium text-white">Intelligence Score</h3>
                          </div>
                          <p className="text-2xl font-bold text-[#FFD700]">{selectedAgent.intelligence}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4 text-emerald-400" />
                            <h3 className="text-sm font-medium text-white">Performance</h3>
                          </div>
                          <p className="text-2xl font-bold text-emerald-400">{selectedAgent.performance || 'N/A'}</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-zinc-800 hover:bg-zinc-800"
                        onClick={() => handleStatusChange(
                          selectedAgent.id,
                          selectedAgent.status === 'active' ? 'paused' : 'active'
                        )}
                      >
                        {selectedAgent.status === 'active' ? (
                          <><PauseCircle className="w-4 h-4 mr-2" /> Pause</>
                        ) : (
<><Power className="w-4 h-4 mr-2" /> Start</>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-zinc-800 hover:bg-zinc-800 hover:text-red-500"
                        onClick={() => handleDeleteAgent(selectedAgent.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="schema" className="space-y-4">
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <label className="text-sm text-zinc-400">Agent Name</label>
                          <Input
                            value={selectedAgent.name}
                            onChange={(e) => handleAgentUpdate(selectedAgent.id, { name: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Ticker</label>
                          <Input
                            value={selectedAgent.ticker}
                            onChange={(e) => handleAgentUpdate(selectedAgent.id, { ticker: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Chain</label>
                          <Input
                            value={selectedAgent.chain || ''}
                            onChange={(e) => handleAgentUpdate(selectedAgent.id, { chain: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Capabilities</label>
                          <Textarea
                            value={selectedAgent.capabilities?.join(', ') || ''}
                            onChange={(e) => handleAgentUpdate(selectedAgent.id, { capabilities: e.target.value.split(', ') })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Behavior Description</label>
                          <Textarea
                            value={selectedAgent.behavior}
                            onChange={(e) => handleAgentUpdate(selectedAgent.id, { behavior: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Twitter Link</label>
                          <Input
                            value={selectedAgent.socialLinks?.twitter || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { twitter: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Telegram Link</label>
                          <Input
                            value={selectedAgent.socialLinks?.telegram || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { telegram: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">YouTube Link</label>
                          <Input
                            value={selectedAgent.socialLinks?.youtube || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { youtube: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Website Link</label>
                          <Input
                            value={selectedAgent.socialLinks?.website || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { website: e.target.value })}
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="grid gap-4">
                      <Card className="bg-zinc-900 border-zinc-800">
                        <CardContent className="p-4 space-y-4">
                          <div>
                            <label className="text-sm text-zinc-400">Agent Name</label>
                            <Input
                              value={selectedAgent.name}
                              onChange={(e) => handleAgentUpdate(selectedAgent.id, { name: e.target.value })}
                              className="bg-[#0A0A0A] border-zinc-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-zinc-400">Ticker</label>
                            <Input
                              value={selectedAgent.ticker}
                              onChange={(e) => handleAgentUpdate(selectedAgent.id, { ticker: e.target.value })}
                              className="bg-[#0A0A0A] border-zinc-800 text-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-zinc-400">Behavior Description</label>
                            <Textarea
                              value={selectedAgent.behavior}
                              onChange={(e) => handleAgentUpdate(selectedAgent.id, { behavior: e.target.value })}
                              className="bg-[#0A0A0A] border-zinc-800 text-white"
                            />
                          </div>
                          {/* Add chain selection and capabilities here */}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-4">
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center space-x-2">
                          <Twitter className="w-5 h-5 text-zinc-400" />
                          <Input 
                            value={selectedAgent.socialLinks?.twitter || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { twitter: e.target.value })}
                            placeholder="Twitter URL"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-zinc-400" />
                          <Input 
                            value={selectedAgent.socialLinks?.telegram || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { telegram: e.target.value })}
                            placeholder="Telegram URL"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Youtube className="w-5 h-5 text-zinc-400" />
                          <Input 
                            value={selectedAgent.socialLinks?.youtube || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { youtube: e.target.value })}
                            placeholder="YouTube URL"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="w-5 h-5 text-zinc-400" />
                          <Input 
                            value={selectedAgent.socialLinks?.website || ''}
                            onChange={(e) => handleSocialUpdate(selectedAgent.id, { website: e.target.value })}
                            placeholder="Website URL"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="apis" className="space-y-4">
                    <Card className="bg-zinc-900 border-zinc-800">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <label className="text-sm text-zinc-400">Twitter API Key</label>
                          <Input
                            type="password"
                            placeholder="Enter Twitter API key"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">Telegram Bot Token</label>
                          <Input
                            type="password"
                            placeholder="Enter Telegram bot token"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400">YouTube API Key</label>
                          <Input
                            type="password"
                            placeholder="Enter YouTube API key"
                            className="bg-[#0A0A0A] border-zinc-800 text-white"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="logs" className="space-y-4">
                    <div className="bg-zinc-900/50 p-4 rounded-lg h-[500px] overflow-y-auto">
                      {selectedAgent.logs.map((log, index) => (
                        <div 
                          key={index}
                          className={`mb-2 p-2 rounded ${
                            log.type === 'error' ? 'bg-red-500/10 border-red-500/20' :
                            log.type === 'success' ? 'bg-green-500/10 border-green-500/20' :
                            'bg-zinc-800/20 border-zinc-800'
                          } border`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                            <span className={`text-sm ${
                              log.type === 'error' ? 'text-red-400' :
                              log.type === 'success' ? 'text-green-400' :
                              'text-zinc-300'
                            }`}>
                              {log.message}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="chat" className="space-y-4">
                    <div className="h-[500px] flex flex-col">
                      <div className="flex-1 bg-zinc-900/50 p-4 rounded-lg overflow-y-auto mb-4">
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`mb-4 ${
                              msg.role === 'user' ? 'text-right' : 'text-left'
                            }`}
                          >
                            <div
                              className={`inline-block p-3 rounded-lg ${
                                msg.role === 'user'
                                  ? 'bg-[#FFD700] text-black ml-12'
                                  : 'bg-zinc-800 text-white mr-12'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                      <form onSubmit={handleMessageSubmit} className="flex gap-2">
                        <Input
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 bg-[#111111] border-zinc-800 text-white"
                        />
                        <Button 
                          type="submit"
                          className="bg-[#FFD700] hover:bg-[#FFC700] text-black"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-[#111111] border-zinc-800 h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Bot className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-zinc-400">Select an agent to view details</h3>
                <p className="text-sm text-zinc-600">Choose from the list on the left to manage your agents</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <DeployAgentModal 
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeploy}
      />
    </div>
  );
}