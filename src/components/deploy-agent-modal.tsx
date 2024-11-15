// src/components/deploy-agent-modal.tsx
"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Coins, Network } from 'lucide-react';
import Image from 'next/image';

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeployAgentModal({ isOpen, onClose }: DeployAgentModalProps) {
  const [step, setStep] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
}