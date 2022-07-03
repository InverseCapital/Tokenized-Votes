import { ethers } from "hardhat";
import "dotenv/config";
import { deployContract } from "../utils/contracts";

async function main() {
  const accounts = await ethers.getSigners();

  console.log("Using address: ", accounts[0].address);

  // Check signer balance
  const balanceBN = await accounts[0].getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));

  console.log(`Wallet balance: ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // Deploy token contract
  const myTokenContract = await deployContract("MyToken");

  console.log(
    "Deployed MyToken contract at address: ",
    myTokenContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
