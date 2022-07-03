import { Contract, ContractInterface, ethers } from "ethers";

import { getProvider } from "./providers";
import * as customBallotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as myTokenJson from "../artifacts/contracts/MyToken.sol/MyToken.json";
import { CustomBallot, MyToken } from "../typechain";

export function getContract<T extends Contract>(
  address: string,
  abi: ContractInterface,
  withSigner = true
) {
  const provider = getProvider();

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  const signer = wallet.connect(provider);

  return new Contract(address, abi, withSigner ? signer : provider) as T;
}

export function getBallotContract(withSigner = true) {
  return getContract<CustomBallot>(
    process.env.BALLOT_CONTRACT_ADDRESS || "",
    customBallotJson.abi,
    withSigner
  );
}

export function getTokenContract(withSigner = true) {
  return getContract<MyToken>(
    process.env.TOKEN_CONTRACT_ADDRESS || "",
    myTokenJson.abi,
    withSigner
  );
}
