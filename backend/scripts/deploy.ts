import { ethers } from "hardhat"
import fs from "fs"

async function main() {
  const RGB = await ethers.getContractFactory("RGB");
  const rgb = await RGB.deploy();

  await rgb.deployed();

  fs.writeFileSync("../frontend/src/abi/abi.json", RGB.interface.format(ethers.utils.FormatTypes.json).toString())
  fs.writeFileSync("../frontend/src/abi/address.json", '{ "address": "' + rgb.address + '"}')

  console.log(
    `Deployed to ${rgb.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
