import { ethers } from "ethers";

const networkUrls: Record<string, string> = {
  ropsten: process.env.ROPSTEN_URL || "",
  rinkeby: process.env.RINKEBY_URL || "",
};

export function getProvider(network = "ropsten") {
  return new ethers.providers.JsonRpcProvider(networkUrls[network], network);
}
