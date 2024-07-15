const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
//          const mmitTokenFactory = await ethers.getContractFactory("MyToken");
//          const mmitToken = await mmitTokenFactory.deploy("0x25E103D477025F9A8270328d84397B2cEE32D0BF",{
//                   gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
//                   gasLimit: 5000000 // Adjust the gas limit as needed
//                 });
//          await mmitToken.waitForDeployment(5);

//          const mmitTokenContractAddress = await mmitToken.getAddress();

//          console.log("mmitTokenContractAddress",mmitTokenContractAddress);
   
//          const stakingFacory = await ethers.getContractFactory("Staking");
//          const staking = await upgrades.deployProxy(
//            stakingFacory,
//            [mmitTokenContractAddress, "0x25E103D477025F9A8270328d84397B2cEE32D0BF"],
//            { kind: "uups" }
//        );
//        const stakingContractAddress = await staking.getAddress();

//        console.log("Staking Contract deployed to:", stakingContractAddress);

//        const implementationContractAddressStaking = await upgrades.erc1967.getImplementationAddress(
//          stakingContractAddress
//         );

//         console.log("implementationContractAddressStaking",implementationContractAddressStaking);

//         await hre.run("verify:verify", {
//          address: "0x375a0635917f68f7f7733ab142a52c0891bdd143",
//          constructorArguments: [],
//      });

await hre.run("verify:verify", {
  address: "0x714aEb9Ec400AE05e039C7Fd9Fc9548A058352A3",
  constructorArguments: ["0x25E103D477025F9A8270328d84397B2cEE32D0BF"],
});
  

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});