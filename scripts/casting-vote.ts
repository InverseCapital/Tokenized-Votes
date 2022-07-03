import { ethers } from "hardhat";
import "dotenv/config";

import { getBallotContract } from "../utils/contracts";

async function main() {
  const accounts = await ethers.getSigners();
  const ballotContract = getBallotContract();

  console.log("Checking voting power...");
  console.log("Voting with account: ", accounts[0].address);

  const votingPower = await ballotContract.votingPower();
  console.log("Voting power: ", ethers.utils.formatEther(votingPower));

  const voteTx = await ballotContract.vote(0, ethers.utils.parseEther("10"));
  await voteTx.wait();

  console.log("Vote transaction hash: ", voteTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
