import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";

// Tasks
import "./tasks";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    // SOURCE: https://docs.base.org/docs/tools/hardhat/
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
};

export default config;
