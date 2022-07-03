import { ethers } from "hardhat";
import "dotenv/config";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  console.log("Deploying....");

  // Deploy token contract
  const tokenContractFactory = await ethers.getContractFactory("MyToken");
  const myTokenContract = await tokenContractFactory.deploy();
  await myTokenContract.deployed();

  console.log(
    "Deployed MyToken contract at address: ",
    myTokenContract.address
  );

  // Deploying CustomBallon Contract
  const contractFactory = await ethers.getContractFactory("CustomBallot");
  const customBallotContractFactory = await contractFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS),
    myTokenContract.address
  );
  await customBallotContractFactory.deployed();

  console.log(
    "Deployed CustomBallot contract at address: ",
    customBallotContractFactory.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
