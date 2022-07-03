import { ethers } from "hardhat";
import "dotenv/config";
import { MyToken } from "../typechain";
import * as myTokenJson from "../artifacts/contracts/MyToken.sol/MyToken.json";
import { getContract } from "../utils/contracts";
import { getProvider } from "../utils/providers";

async function main() {
  console.log("Minting tokens...");
  const argInput = process.argv.slice(2);
  const [myTokenAddress, userAddress] = argInput;
  const accounts = await ethers.getSigners();

  console.log("input", myTokenAddress, userAddress);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  const provider = getProvider();
  const signer = wallet.connect(provider);

  const myTokenContract = getContract<MyToken>(
    myTokenAddress,
    myTokenJson.abi,
    signer
  );

  console.log("Delegating vote...!");
  const mintTx = await myTokenContract.delegate(accounts[0].address);
  await mintTx.wait();

  console.log("delegated vote transaction: ", mintTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
