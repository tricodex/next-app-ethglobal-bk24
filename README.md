# Runereum

Runereum is an AI agent platform that enables autonomous trading and interaction with Bitcoin Runes through smart contracts on Base Sepolia.

## 🏆 ETH Global Bangkok Participant
[View Our Project Showcase](https://ethglobal.com/showcase/runereum-szqfy)

## 🔍 Contract Verification & Proofs

### Deployed Contracts on Base Sepolia
- **Main Contract**: [View on Blockscout](https://base-sepolia.blockscout.com/address/0x2A68777D473ba286d41D4DEE1A994e87092B7745)
- **AI Agent Contract**: [View on Blockscout](https://base-sepolia.blockscout.com/address/0x325d33Eae79AA885b369604184cAe1B3De824859)

## 📂 Project Structure

```
runereum/
├── rootstock/              # Rootstock & Bitcoin Runes integration
├── akave_setup/           # Akave Bucket setup scripts
├── cdp_agentkit/         # Langchain & AgentKit integration
└── nextjs/               # Frontend application
```

### Frontend Application (NextJS)
- Deployed on Vercel
- Features:
  - AI Agent Management Dashboard
  - Real-time Chat Interface
  - Transaction Tracking
  - Performance Analytics
  - Social Integration

## 🤖 AI Agent Capabilities

- **Smart Contract Interaction**: Execute transactions on Base Sepolia
- **Market Analysis**: Real-time data processing and trend analysis
- **Token Management**: Handle token swaps and liquidity positions
- **Cross-Chain Operations**: Integration with Bitcoin through Rootstock
- **Social Integration**: Manage social media presence and community interactions

## 💻 Technical Stack

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Shadcn/ui Components

### Blockchain
- Base Sepolia Network
- Rootstock Integration
- Bitcoin Runes Support

### AI & Data Storage
- OpenAI GPT-4
- Langchain
- Akave Storage Solution

### Key Features
```typescript
// System Prompt Example
const SYSTEM_PROMPT = `
Acting as an autonomous AI trading agent on Base Sepolia network.
Address: ${AGENT_ADDRESS}

Capabilities:
1. Smart Contract Execution
2. Market Analysis
3. Token Swaps
4. Liquidity Management
5. Cross-chain Operations

References:
- Explorer: ${BLOCK_EXPLORER_URL}
- Transaction Details
- Gas Optimizations
- Network Status
`;
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/runereum.git
cd runereum
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your API keys and configuration
```

4. Run the development server:
```bash
pnpm dev
```

## 🔑 Key Components

### Agent Management
```typescript
interface Agent {
  id: number;
  name: string;
  ticker: string;
  intelligence: number;
  status: 'active' | 'paused' | 'stopped';
  capabilities: string[];
  behavior: string;
}
```

### Chat Interface
```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  transactionHash?: string;
  blockExplorerUrl?: string;
}
```



## 🛠️ Development Tools

- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library
- **CI/CD**: Github Actions, Vercel


## 🙏 Acknowledgments

- ETH Global Bangkok
- Base Team
- Rootstock Development Team
- Coinbase Developer Platform
- Blockscout Team

---
