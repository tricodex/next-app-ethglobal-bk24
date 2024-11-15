// src/app/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, ChartBar, Users, Wallet } from 'lucide-react';
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
    description: "Advanced AI agent specializing in market analysis"
  },
  // Add more agents as needed
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen p-8 bg-background">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI Agent Dashboard</h1>
        <Button className="bg-primary hover:bg-primary/90">
          Create New Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Agents",
            value: "1,234",
            icon: Brain,
            change: "+12.5%",
            description: "Active AI agents"
          },
          {
            title: "Market Cap",
            value: "$345M",
            icon: ChartBar,
            change: "+23.4%",
            description: "Total value locked"
          },
          {
            title: "Daily Users",
            value: "45.2K",
            icon: Users,
            change: "+8.2%",
            description: "Unique interactions"
          },
          {
            title: "Revenue",
            value: "$123.4K",
            icon: Wallet,
            change: "+15.7%",
            description: "24h earnings"
          }
        ].map((stat, i) => (
          <Card key={i} className="animate-fade-scale [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500">{stat.change}</span> from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline">Market Cap</Button>
        <Button variant="outline">Intelligence</Button>
        <Button variant="outline">Recent</Button>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={agent.profileImage}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.ticker}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{agent.marketCap}</p>
                  <p className="text-sm text-emerald-500">{agent.change24h}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {agent.description}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  Intelligence Score: {agent.intelligence}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}