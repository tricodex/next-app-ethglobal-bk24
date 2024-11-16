import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const RunereumModule = buildModule("RunereumModule", (m) => {
  const ownerAddress = m.getAccount(0);
  const runereum = m.contract("RunereumToken", [
    "RunereumToken",
    "SRUNE",
    "ipfs://base-uri/",
    "ipfs://contract-uri",
    ownerAddress,
  ]);

  return { runereum };
});

export default RunereumModule;
