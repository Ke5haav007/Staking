const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
      //    const mmitTokenFactory = await ethers.getContractFactory("MyToken");
      //    const mmitToken = await mmitTokenFactory.deploy("0x25E103D477025F9A8270328d84397B2cEE32D0BF",{
      //             gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
      //             gasLimit: 5000000 // Adjust the gas limit as needed
      //           });
      //    await mmitToken.waitForDeployment(5);

      //    const mmitTokenContractAddress = await mmitToken.getAddress();

      //    console.log("mmitTokenContractAddress",mmitTokenContractAddress);
   
      //    const stakingFacory = await ethers.getContractFactory("Staking");
      //    const staking = await upgrades.deployProxy(
      //      stakingFacory,
      //      ["0xcF0d61Cbd5Dc16cb7dCf36D80630e633D1f9A0Ee", "0x25E103D477025F9A8270328d84397B2cEE32D0BF"],
      //      { kind: "uups" }
      //  );
      //  const stakingContractAddress = await staking.getAddress();

      //  console.log("Staking Contract deployed to:", stakingContractAddress);

      //  const implementationContractAddressStaking = await upgrades.erc1967.getImplementationAddress(
      //    stakingContractAddress
      //   );

      //   console.log("implementationContractAddressStaking",implementationContractAddressStaking);

        await hre.run("verify:verify", {
         address: "0xdd03978e19b8ef0ae034e169360379508fe519aa",
         constructorArguments: [],
     });

// await hre.run("verify:verify", {
//   address: mmitToken.target,
//   constructorArguments: ["0x25E103D477025F9A8270328d84397B2cEE32D0BF"],
// });

// mmitTokenContractAddress 0xcF0d61Cbd5Dc16cb7dCf36D80630e633D1f9A0Ee
// Staking Contract deployed to: 0xBCb7EE122974d2C9524dE4f8c3a20b52E4184264
  
console.log("Verification Done")

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});