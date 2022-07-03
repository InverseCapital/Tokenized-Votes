import { ethers } from "hardhat";
import "dotenv/config";

import { convertStringArrayToBytes32 } from "../utils/common";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const accounts = await ethers.getSigners();

  console.log("Using address: ", accounts[0].address);

  // Deploy token contract
  // const tokenContractFactory = await ethers.getContractFactory("MyToken");
  // const myTokenContract = await tokenContractFactory.deploy();
  // await myTokenContract.deployed();

  // console.log(
  //   "Deployed MyToken contract at address: ",
  //   myTokenContract.address
  // );

  // Deploying CustomBallot Contract
  const ballotContractFactory = await ethers.getContractFactory("CustomBallot");
  const ballotContract = await ballotContractFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS),
    "0x7d409B232bBe6D51056C289983c4B2B343A498D8"
  );
  await ballotContract.deployed();

  console.log(
    "Deployed CustomBallot contract at address: ",
    ballotContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
