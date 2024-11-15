// src/components/deploy-agent-modal.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SUPPORTED_CAPABILITIES, SUPPORTED_CHAINS } from '@/lib/constants/agent';
import type { AgentConfig } from '@/types/agent';

const agentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  chain: z.string(),
  capabilities: z.array(z.string()).min(1, 'Select at least one capability'),
  behavior: z.string().min(10, 'Behavior description must be at least 10 characters'),
});

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy?: (agent: AgentConfig) => Promise<void>;
}

export const DeployAgentModal = ({ 
  isOpen, 
  onClose,
  onDeploy 
}: DeployAgentModalProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [selectedCapabilities, setSelectedCapabilities] = useState<Set<string>>(new Set());
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0].id);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      chain: SUPPORTED_CHAINS[0].id,
      capabilities: [],
    }
  });

  const handleCapabilityToggle = (capabilityId: string) => {
    setSelectedCapabilities(prev => {
      const updated = new Set(prev);
      if (updated.has(capabilityId)) {
        updated.delete(capabilityId);
      } else {
        updated.add(capabilityId);
      }
      return updated;
    });
  };

  const handleDeploy = async (data: z.infer<typeof agentSchema>) => {
    try {
      setIsDeploying(true);
      await onDeploy?.({
        ...data,
        capabilities: Array.from(selectedCapabilities)
      });
      toast({
        title: "Success!",
        description: "Agent deployed successfully",
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Deployment error:', error);
      toast({
        title: "Error",
        description: "Failed to deploy agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#0A0A0A]/95 border-zinc-800">
        <div className="fixed inset-0 pointer-events-none">
          <Image
            src="/modal-bg1.png"
            alt="Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-3xl brand-text text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            Deploy Your AI Agent
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleDeploy)} className="relative z-10 mt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-zinc-200 font-medium">Agent Name</label>
              <Input 
                {...register('name')}
                placeholder="Enter a unique name..."
                className="bg-[#111111] border-zinc-700 text-white"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-zinc-200 font-medium">Chain</label>
              <div className="grid grid-cols-3 gap-3">
                {SUPPORTED_CHAINS.map((chain) => (
                  <Button
                    key={chain.id}
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedChain(chain.id)}
                    className={`border-zinc-700 transition-all duration-200 ${
                      selectedChain === chain.id
                        ? 'bg-[#FFD700] text-black border-[#FFD700]' 
                        : 'bg-[#111111] text-white hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <chain.icon className="mr-2 h-4 w-4" />
                    {chain.name}
                    {chain.testnet && (
                      <span className="ml-1 text-xs opacity-70">(T)</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-zinc-200 font-medium">Capabilities</label>
              <div className="grid grid-cols-2 gap-3">
                {SUPPORTED_CAPABILITIES.map((capability) => (
                  <Button
                    key={capability.id}
                    type="button"
                    variant="outline"
                    onClick={() => handleCapabilityToggle(capability.id)}
                    className={`border-zinc-700 justify-start transition-all duration-200 ${
                      selectedCapabilities.has(capability.id)
                        ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]'
                        : 'bg-[#111111] text-white hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <capability.icon className={`mr-2 h-4 w-4 ${
                      selectedCapabilities.has(capability.id) 
                        ? 'text-[#FFD700]' 
                        : 'text-white'
                    }`} />
                    <span>{capability.name}</span>
                  </Button>
                ))}
              </div>
              {errors.capabilities && (
                <p className="text-red-400 text-sm">{errors.capabilities.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-zinc-200 font-medium">Behavior Description</label>
              <Textarea 
                {...register('behavior')}
                placeholder="Describe how your agent should behave..."
                className="bg-[#111111] border-zinc-700 text-white h-24 resize-none"
              />
              {errors.behavior && (
                <p className="text-red-400 text-sm">{errors.behavior.message}</p>
              )}
            </div>

            <div className="pt-4">
              <Button 
                type="submit"
                disabled={isDeploying}
                className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold"
              >
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Deploy Agent
                  </>
                )}
              </Button>
              <p className="text-xs text-zinc-400 text-center mt-2">
                Deployment requires a small gas fee on {
                  SUPPORTED_CHAINS.find(chain => chain.id === selectedChain)?.name
                }
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};