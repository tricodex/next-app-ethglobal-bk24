import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const remoteOwner = "0x325d33Eae79AA885b369604184cAe1B3De824859";

const RunereumModule = buildModule("RunereumNFTModel", (m) => {
  const ownerAddress = m.getAccount(0);
  const runereum = m.contract("RunereumNFT", [
    "RunereumToken",
    "SRUNE",
    ownerAddress,
  ]);

  m.call(runereum, "transferOwnership", [remoteOwner]);

  return { runereum };
});

export default RunereumModule;
