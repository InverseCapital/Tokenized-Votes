import { ethers } from "hardhat";
import "dotenv/config";
import { getContract } from "../utils/contracts";
import { getProvider } from "../utils/providers";
import * as customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

async function main() {
  console.log("Casting vote...");
  const argInput = process.argv.slice(2);
  const [customBallotAddress, userAddress] = argInput;

  console.log("input", customBallotAddress, userAddress);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  const provider = getProvider();
  const signer = wallet.connect(provider);

  const myTokenContract = getContract<CustomBallot>(
    customBallotAddress,
    customBallotJson.abi,
    signer
  );

  console.log("checking if we have voting power ...!");
  const votingPower = await myTokenContract.votingPower();
  console.log("voting power: ", votingPower);

  console.log("Started voting ...!");
  const mintTx = await myTokenContract.vote(0, ethers.utils.parseEther("50"));
  await mintTx.wait();

  console.log("vote transaction: ", mintTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
