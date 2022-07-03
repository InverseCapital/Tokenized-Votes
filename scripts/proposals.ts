import { ethers } from "ethers";
import "dotenv/config";

import { getBallotContract } from "../utils/contracts";

async function main() {
  const ballotContract = getBallotContract();

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
