import { Contract, ethers } from "ethers";
import "dotenv/config";

import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";

async function main() {
  const argInput = process.argv.slice(2);
  const ballotContractAddress = argInput[0];

  const provider = ethers.providers.getDefaultProvider("ropsten");

  const ballotContract = new Contract(
    ballotContractAddress,
    ballotJson.abi,
    provider
  ) as CustomBallot;

  const proposals = await ballotContract.getProposals();

  proposals.forEach((proposal) => {
    console.log(
      "Proposal name: ",
      ethers.utils.parseBytes32String(proposal.name)
    );
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
