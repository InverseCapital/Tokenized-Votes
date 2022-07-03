import { Contract, ethers } from "ethers";
import "dotenv/config";

import * as tokenJson from "../artifacts/contracts/MyToken.sol/MyToken.json";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot, MyToken } from "../typechain";

async function main() {
  const ballotContractAddress = process.argv[2];

  const provider = ethers.providers.getDefaultProvider("ropsten", {
    infura: {
      projectId: process.env.INFURA_API_KEY,
      projectSecret: process.env.INFURA_API_SECRET,
    },
  });


  const ballotContract = new Contract(
    ballotContractAddress,
    ballotJson.abi,
    provider
  ) as CustomBallot;

  const winningProposalIndex = await ballotContract.winningProposal();
  // Could also have used ballotContract.winnerName()
  const proposal = await ballotContract.proposals(winningProposalIndex);
  console.log('The winning proposal is "'+ ethers.utils.parseBytes32String(proposal.name) + '" with ' + proposal.voteCount +  ' votes. ');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
