// src/app/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Brain, Network, RefreshCcw } from 'lucide-react';

interface AgentMetrics {
 activeAgents: number;
 totalTransactions: number;
 successRate: number;
 networkHealth: number;
}

export default function DashboardPage() {
 const [metrics] = useState<AgentMetrics>({
   activeAgents: 42,
   totalTransactions: 1337,
   successRate: 99.5,
   networkHealth: 98,
 });

 return (
   <div className="flex h-screen bg-background">
     
     <main className="flex-1 overflow-y-auto">
       <div className="container mx-auto px-6 py-8">
         <div className="flex items-center justify-between mb-8">
           <h1 className="text-3xl font-bold">AI Rune Agents Dashboard</h1>
           <Button className="flex items-center gap-2">
             <RefreshCcw className="w-4 h-4" />
             Refresh Data
           </Button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <Card className="animate-fade-scale">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
               <Brain className="w-4 h-4 text-primary" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{metrics.activeAgents}</div>
               <p className="text-xs text-muted-foreground">+2.5% from last hour</p>
             </CardContent>
           </Card>

           <Card className="animate-fade-scale [animation-delay:100ms]">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
               <BarChart3 className="w-4 h-4 text-primary" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{metrics.totalTransactions}</div>
               <p className="text-xs text-muted-foreground">+12.3% from last hour</p>
             </CardContent>
           </Card>

           <Card className="animate-fade-scale [animation-delay:200ms]">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
               <Network className="w-4 h-4 text-primary" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{metrics.successRate}%</div>
               <p className="text-xs text-muted-foreground">+0.5% from last hour</p>
             </CardContent>
           </Card>

           <Card className="animate-fade-scale [animation-delay:300ms]">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-sm font-medium">Network Health</CardTitle>
               <Network className="w-4 h-4 text-primary" />
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold">{metrics.networkHealth}%</div>
               <p className="text-xs text-muted-foreground">Optimal Performance</p>
             </CardContent>
           </Card>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="animate-fade-scale [animation-delay:400ms]">
             <CardHeader>
               <CardTitle>Active Agent Network</CardTitle>
             </CardHeader>
             <CardContent className="h-[400px]">
               {/* Network Visualization Component */}
               <div className="flex items-center justify-center h-full bg-accent/10 rounded-lg">
                 Network Visualization Coming Soon
               </div>
             </CardContent>
           </Card>

           <Card className="animate-fade-scale [animation-delay:500ms]">
             <CardHeader>
               <CardTitle>Recent Activities</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-accent/10">
                     <Brain className="w-8 h-8 text-primary" />
                     <div>
                       <h3 className="font-medium">Agent #{42 + i} Activity</h3>
                       <p className="text-sm text-muted-foreground">
                         Processed transaction {1000 + i} successfully
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </main>
   </div>
 );
}