// src/components/Chat.tsx
"use client";

import React, { useState } from 'react';
import { Loader2, MessageSquare, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Agent } from '@/types/agent';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  pending?: boolean;
  transactionHash?: string;
  blockExplorerUrl?: string;
}

interface ChatProps {
  agent: Agent;
  className?: string;
}

const BLOCK_EXPLORER_URL = 'https://base-sepolia.blockscout.com';
const AGENT_ADDRESS = '0x325d33Eae79AA885b369604184cAe1B3De824859';

const SYSTEM_PROMPT = `You are an autonomous AI trading agent operating on the Base Sepolia network at address ${AGENT_ADDRESS}. Your capabilities include:

1. Executing smart contract transactions
2. Analyzing market data
3. Performing token swaps
4. Managing liquidity positions
5. Interacting with DeFi protocols

You can reference blockchain transactions and integrate with Base Sepolia. When discussing transactions:
- Reference the block explorer URL: ${BLOCK_EXPLORER_URL}
- Include transaction hashes when mentioning operations
- Explain gas costs and network fees
- Describe transaction status and confirmations

Format your responses to include transaction details when relevant, and always maintain a professional yet approachable trading agent persona.`;

const Chat = ({ agent, className }: ChatProps): JSX.Element => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const generateMessageId = () => Math.random().toString(36).substring(7);

    const userMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    const pendingMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'agent',
      content: '...',
      timestamp: new Date(),
      pending: true
    };

    setMessages(prev => [...prev, userMessage, pendingMessage]);
    setCurrentMessage('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          agentContext: {
            name: agent.name,
            capabilities: agent.capabilities,
            behavior: agent.behavior,
            systemPrompt: SYSTEM_PROMPT
          }
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      const mockTxHash = `0x${Array(64).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const agentMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'agent',
        content: data.message,
        timestamp: new Date(),
        transactionHash: mockTxHash,
        blockExplorerUrl: `${BLOCK_EXPLORER_URL}/tx/${mockTxHash}`,
      };

      setMessages(prev => [...prev.slice(0, -1), agentMessage]);
      scrollToBottom();

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive"
      });

      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("h-[500px] flex flex-col", className)}>
      <div 
        id="chat-container"
        className="flex-1 bg-zinc-900/50 p-4 rounded-lg overflow-y-auto mb-4 space-y-4"
      >
        <div className="text-center p-4 mb-4">
          <div className="inline-block bg-zinc-800/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Connected to {agent.name}
            </h3>
            <div className="flex flex-col items-center gap-2 text-sm text-zinc-400">
              
                href={`${BLOCK_EXPLORER_URL}/address/${AGENT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-[#FFD700] transition-colors"
              >
                View Contract
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="text-xs opacity-75">
                {AGENT_ADDRESS}
              </div>
            </div>
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div 
              className={cn(
                "max-w-[80%]",
                msg.role === 'user' ? 'ml-12' : 'mr-12'
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-lg",
                  msg.role === 'user' 
                    ? 'bg-[#FFD700] text-black' 
                    : 'bg-zinc-800 text-white',
                  msg.pending && 'animate-pulse'
                )}
              >
                {msg.content}
              </div>
              
              <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                <span>{msg.timestamp.toLocaleTimeString()}</span>
                {msg.transactionHash && (
                  <>
                    <span>•</span>
                    
                      href={msg.blockExplorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-[#FFD700] transition-colors"
                    >
                      View Transaction
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSubmit} className="flex gap-2">
        <Input
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Ask about transactions, market analysis, or trading strategies..."
          className="flex-1 bg-[#111111] border-zinc-800 text-white"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          className={cn(
            "bg-[#FFD700] hover:bg-[#FFC700] text-black",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MessageSquare className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default Chat;