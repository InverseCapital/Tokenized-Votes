import { ethers } from "ethers";
import "dotenv/config";

import { getBallotContract } from "../utils/contracts";

async function main() {
  const ballotContract = getBallotContract();

  const winningProposalIndex = await ballotContract.winningProposal();

  // Could also have used ballotContract.winnerName()
  const proposal = await ballotContract.proposals(winningProposalIndex);
  const proposalName = ethers.utils.parseBytes32String(proposal.name);
  const voteCount = ethers.utils.formatEther(proposal.voteCount);

  console.log(
    `The winning proposal is "${proposalName}" with ${voteCount} votes`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
