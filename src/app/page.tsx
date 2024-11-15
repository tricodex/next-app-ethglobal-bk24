// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Cpu, Wallet, ChartBar } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <section className="parallax-container h-screen">
        <div 
          className="parallax-hero"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src="/hero.png"
            alt="AI Agent Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
        
        <div className="hero-content flex items-center justify-center h-screen">
          <div className="text-center text-white px-4">
            <h1 className="brand-text text-7xl mb-6 animate-float">
              <span className="gradient-text">Runereum</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Create, Deploy & Trade Intelligent AI Agents. 
            </p>
            <div className="flex gap-4 justify-center">
                <button className="lp-button">
                <a href="/dashboard">Launch App</a>
                </button>
              <button className="lp-button bg-transparent border-2 border-white text-white">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black/95 py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-center text-white mb-16 brand-text">
            Advanced Capabilities
          </h2>
          
          <div className="feature-grid">
            {[
              {
                icon: Brain,
                title: "Autonomous Trading",
                description: "AI agents execute smart trades using CoinbaseKit integration"
              },
              {
                icon: Cpu,
                title: "Multi-Model Intelligence",
                description: "Leveraging LLMs, Vision, and Speech models for comprehensive interaction"
              },
              {
                icon: Wallet,
                title: "Smart Contract Integration",
                description: "ERC-6551 compatible wallets for seamless asset management"
              },
              {
                icon: ChartBar,
                title: "Performance Analytics",
                description: "Real-time monitoring and optimization of agent strategies"
              }
            ].map((feature, i) => (
              <Card key={i} className="glass-card transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-white">
                <feature.icon className="w-12 h-12 mb-4 text-[#FFD700]" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}