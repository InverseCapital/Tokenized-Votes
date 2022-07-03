import { Contract, ContractInterface, ethers } from "ethers";

import { getProvider } from "./providers";

export function getContract<T extends Contract>(
  address: string,
  abi: ContractInterface,
  signer: ethers.Signer
) {
  const provider = getProvider();
  return new Contract(address, abi, signer ?? provider) as T;
}
