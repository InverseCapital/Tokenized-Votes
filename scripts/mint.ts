import { ethers } from "hardhat";
import "dotenv/config";
import { getTokenContract } from "../utils/contracts";

async function main() {
  const accounts = await ethers.getSigners();
  const tokensToMint = 100;
  const myTokenContract = getTokenContract();

  console.log(
    `Minting ${tokensToMint} tokens to address: `,
    accounts[0].address
  );

  const mintTx = await myTokenContract.mint(
    accounts[0].address,
    ethers.utils.parseEther(tokensToMint.toString())
  );
  await mintTx.wait();

  console.log("Mint transaction hash: ", mintTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
