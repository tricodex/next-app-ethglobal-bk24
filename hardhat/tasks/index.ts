import { task } from "hardhat/config";
import { formatEther } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";

task("generate-private-key", "Generates a new private key").setAction(
  async (_args, { viem: _viem }) => {
    // Generate a new private key
    const privateKey = generatePrivateKey();
    console.log("New private key: ", privateKey);
    console.log("Public key: ", privateKeyToAddress(privateKey));
  }
);

task("my-balance", "Prints main account's balance", async (_args, { viem }) => {
  const [bobWalletClient] = await viem.getWalletClients();

  const publicClient = await viem.getPublicClient();
  const bobBalance = await publicClient.getBalance({
    address: bobWalletClient.account.address,
  });

  console.log(
    `Balance of ${bobWalletClient.account.address}: ${formatEther(
      bobBalance
    )} ETH`
  );
});
