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
  console.log("user address is: ", accounts[0].address);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "");
  const provider = getProvider();
  const signer = wallet.connect(provider);

  const myTokenContract = getContract<MyToken>(
    myTokenAddress,
    myTokenJson.abi,
    signer
  );

  console.log("get votes...");
  const votes = await myTokenContract.getVotes(accounts[0].address);
  console.log("votes", votes);

  console.log("Started minting ...!");
  const mintTx = await myTokenContract.mint(
    accounts[0].address,
    ethers.utils.parseEther("100")
  );
  await mintTx.wait();

  console.log("mint transaction: ", mintTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
