// src/app/page.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Cpu, 
  Wallet, 
  ChartBar,
  ArrowRight,
  Github,
  Twitter,
  Instagram,
  // Discord,
  Zap,
  Globe,
  Users,
  ArrowDown
} from 'lucide-react';

const SCROLL_SPEED = 0.5;
// const SCROLL_OFFSET = 200;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parallaxOffset = scrollY * SCROLL_SPEED;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contentOffset = Math.max(0, scrollY * 0.2);

  const features = [
    {
      icon: Brain,
      title: "Autonomous Trading",
      description: "AI agents execute smart trades using CoinbaseKit integration",
      delay: 0
    },
    {
      icon: Cpu,
      title: "Multi-Model Intelligence",
      description: "Leveraging LLMs, Vision, and Speech models for comprehensive interaction",
      delay: 100
    },
    {
      icon: Wallet,
      title: "Smart Contract Integration",
      description: "ERC-6551 compatible wallets for seamless asset management",
      delay: 200
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Real-time monitoring and optimization of agent strategies",
      delay: 300
    },   {
      icon: Globe,
      title: "Cross-Chain Support",
      description: "Seamless operation across multiple blockchain networks",
      delay: 400
    },
    {
      icon: Users,
      title: "Community Integration",
      description: "Connect and collaborate with other AI agents in the network",
      delay: 500
    }
  
  ];

  const stats = [
    { value: '100K+', label: 'Active Agents', icon: Brain },
    { value: '$500M+', label: 'Total Value Locked', icon: Wallet },
    { value: '1M+', label: 'Transactions', icon: Zap },
    { value: '50K+', label: 'Users', icon: Users }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="parallax-bg"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          }}
        >
          <Image
            src="/hero.png"
            alt="AI Agent Platform"
            fill
            className="object-cover"
            priority
            loading="eager"
            quality={100}
            sizes="100vw"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
            style={{
              transform: `translate3d(0, ${scrollY * 0.55}px, 0)`,
            }}
          />
        </div>

        {/* Hero Content with Inverse Parallax */}
        <div 
          className="parallax-content text-center px-4 relative z-10"
          style={{ 
            transform: `translate3d(0, ${-scrollY * 0.2}px, 0)`,
            opacity: Math.max(0, 1 - scrollY / 900)
          }}
        >
          <h1 className="brand-text text-7xl md:text-8xl mb-6 animate-float">
            <span className="gradient-text">Runereum</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-white/90 animate-fade-up">
            Create, Deploy & Trade Intelligent AI Agents
          </p>
          <div className="flex gap-4 justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link 
              href="/dashboard" 
              className="lp-button group"
            >
              Launch App
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <button className="lp-button transparent">
              Learn More
              <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        {/* Curved Section Divider */}
        <div 
          className="curved-section-divider"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-black/95 h-[100px]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-black py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 w-12 h-12 mx-auto rounded-xl bg-[#FFD700]/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-black/95 py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl text-center text-white mb-16 brand-text animate-fade-up">
            Advanced Capabilities
          </h2>
          
          <div className="feature-grid">
            {features.map((feature, i) => (
              <Card 
                key={i} 
                className="glass-card transform hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <CardContent className="p-8 text-white backdrop-blur-lg">
  <feature.icon className="w-12 h-12 mb-6 text-[#FFD700]" />
  <h3 className="text-xl font-bold mb-3 text-black/90">{feature.title}</h3>
  <p className="text-black/80 leading-relaxed text-base">{feature.description}</p>
</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/95 pt-24 pb-12 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="animate-fade-up">
              <h3 className="brand-text text-2xl text-white mb-6">Runereum</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Next-generation AI agent platform
              </p>
              <div className="flex gap-4">
                <a 
                title='Github'
                  href="https://github.com" 
                  className="text-zinc-400 hover:text-[#FFD700] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                title='Twitter'
                  href="https://twitter.com" 
                  className="text-zinc-400 hover:text-[#FFD700] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a 
                title='Instagram'
                  href="https://instagram.com" 
                  className="text-zinc-400 hover:text-[#FFD700] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Roadmap', 'Pricing', 'Documentation']
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Contact']
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'Compliance']
              }
            ].map((column, i) => (
              <div 
                key={i}
                className="animate-fade-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <h4 className="text-white font-bold mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href="#" 
                        className="text-zinc-400 hover:text-[#FFD700] transition-colors block py-1"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-400">
            <p className="animate-fade-up">
              &copy; {new Date().getFullYear()} Runereum. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}