import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

// Tasks
import "./tasks";

const testnetPrivateKey = process.env.TESTNET_PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    // SOURCE: https://docs.base.org/docs/tools/hardhat/
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [testnetPrivateKey],
      gasPrice: 1000000000,
    },

    // SOURCE: https://dev.rootstock.io/developers/smart-contracts/hardhat/configure-hardhat-rootstock/
    "rsk-testnet": {
      url: `https://rpc.testnet.rootstock.io/${process.env.RSK_API_KEY}`,
      chainId: 31,
      gasPrice: 60000000,
      accounts: [testnetPrivateKey],
    },
  },
};

export default config;
