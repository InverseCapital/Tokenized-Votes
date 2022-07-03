import { ethers } from "hardhat";
import "dotenv/config";

import { convertStringArrayToBytes32 } from "../utils/common";
import { deployContract } from "../utils/contracts";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

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

  // Deploying CustomBallot Contract
  const ballotContract = await deployContract(
    "CustomBallot",
    convertStringArrayToBytes32(PROPOSALS),
    process.env.TOKEN_CONTRACT_ADDRESS || ""
  );

  console.log(
    "Deployed CustomBallot contract at address: ",
    ballotContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
