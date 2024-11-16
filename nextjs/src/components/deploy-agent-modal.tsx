// src/components/deploy-agent-modal.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Zap, Loader2, Link, Twitter, Youtube, MessageCircle, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput } from '@/components/ui/file-upload';
import { SUPPORTED_CAPABILITIES, SUPPORTED_CHAINS } from '@/lib/constants/agent';
import type { AgentConfig } from '@/types/agent';
import { cn } from '@/lib/utils';
import { MintAgentModal } from "@/components/mint-agent-modal";

const agentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  ticker: z.string().min(1, 'Ticker is required'),
  chain: z.string(),
  capabilities: z.array(z.string()).min(1, 'Select at least one capability'),
  behavior: z.string().min(10, 'Behavior description must be at least 10 characters'),
  image: z.any().optional(),
  twitterLink: z.string().optional(),
  telegramLink: z.string().optional(),
  youtubeLink: z.string().optional(),
  website: z.string().optional(),
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
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const [showMintModal, setShowMintModal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  }, []);

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
        capabilities: Array.from(selectedCapabilities),
        image: selectedFile?.[0]
      });
      toast({
        title: "Success!",
        description: "Agent summoned successfully",
      });
      reset();
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.error('Deployment error:', error);
      toast({
        title: "Error",
        description: "Failed to summon agent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={cn(
          "sm:max-w-[600px] bg-[#0A0A0A]/95 border-zinc-800",
          "h-[90vh] overflow-y-auto",
          "flex flex-col gap-4"
        )}>
          <div className="fixed inset-0 pointer-events-none">
            <Image
              src="/modal-bg1.png"
              alt="Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          
          <DialogHeader className="top-0 z-20 py-4 bg-transparent">
            <DialogTitle className="text-3xl brand-text text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Summon New Rune Agent
            </DialogTitle>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-2">
              <video
                ref={videoRef}
                src="/videos/runecloud.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full rounded-lg mt-2 opacity-80"
              />
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleDeploy)} className="relative z-10">
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Image</label>
                <FileUploader
                  value={selectedFile}
                  onValueChange={setSelectedFile}
                  dropzoneOptions={{
                    maxFiles: 1,
                    accept: {
                      'image/*': ['.jpg', '.jpeg', '.png', '.gif']
                    }
                  }}
                >
                  <FileInput>
                    <div className="h-32 rounded-lg border-2 border-dashed border-zinc-700 bg-[#111111] flex items-center justify-center">
                      {selectedFile?.length ? (
                        <FileUploaderContent>
                          {selectedFile.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              {file.name}
                            </FileUploaderItem>
                          ))}
                        </FileUploaderContent>
                      ) : (
                        <div className="text-zinc-400 text-center">
                          <p>Drag & drop an image</p>
                          <p className="text-sm">or click to browse</p>
                        </div>
                      )}
                    </div>
                  </FileInput>
                </FileUploader>
              </div>

              {/* Agent Details */}
              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Agent Name</label>
                <Input 
                  {...register('name')}
                  placeholder="Enter agent name..."
                  className="bg-[#111111] border-zinc-700 text-white"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Ticker</label>
                <Input 
                  {...register('ticker')}
                  placeholder="$TICKER"
                  className="bg-[#111111] border-zinc-700 text-white"
                />
                {errors.ticker && (
                  <p className="text-red-400 text-sm">{errors.ticker.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Description</label>
                <Textarea 
                  {...register('behavior')}
                  placeholder="Set the character and behavior of the agent..."
                  className="bg-[#111111] border-zinc-700 text-white h-24 resize-none"
                />
                {errors.behavior && (
                  <p className="text-red-400 text-sm">{errors.behavior.message}</p>
                )}
              </div>

              {/* Chain Selection */}
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

              {/* Capabilities */}
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
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <label className="text-zinc-200 font-medium">Social Links</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-5 h-5 text-zinc-400" />
                    <Input 
                      {...register('twitterLink')}
                      placeholder="Twitter (Optional)"
                      className="bg-[#111111] border-zinc-700 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-zinc-400" />
                    <Input 
                      {...register('telegramLink')}
                      placeholder="Telegram (Optional)"
                      className="bg-[#111111] border-zinc-700 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-zinc-400" />
                    <Input 
                      {...register('youtubeLink')}
                      placeholder="YouTube (Optional)"
                      className="bg-[#111111] border-zinc-700 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link className="w-5 h-5 text-zinc-400" />
                    <Input 
                      {...register('website')}
                      placeholder="Website (Optional)"
                      className="bg-[#111111] border-zinc-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <Button 
                  type="submit"
                  disabled={isDeploying}
                  className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Summoning...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Summon Agent
                    </>
                  )}
                </Button>

                <Button 
                  type="button"
                  onClick={() => setShowMintModal(true)}
                  className="w-full bg-transparent border-[#FFD700] border text-[#FFD700] hover:bg-[#FFD700]/10"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Mint Agent NFT
                </Button>

                <p className="text-xs text-zinc-400 text-center">
                  Summoning requires a small gas fee on {
                    SUPPORTED_CHAINS.find(chain => chain.id === selectedChain)?.name
                  }
                </p>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <MintAgentModal 
        isOpen={showMintModal} 
        onClose={() => setShowMintModal(false)} 
      />
    </>
  );
};