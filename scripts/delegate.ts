import { ethers } from "hardhat";
import "dotenv/config";
import { getTokenContract } from "../utils/contracts";

async function main() {
  const accounts = await ethers.getSigners();
  const myTokenContract = getTokenContract();

  console.log(`Delegating tokens to: `, accounts[0].address);

  const delegateTx = await myTokenContract.delegate(accounts[0].address);
  await delegateTx.wait();

  console.log("Delegate vote transaction hash: ", delegateTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
