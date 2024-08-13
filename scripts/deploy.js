const {ethers, upgrades} = require('hardhat');
const hre = require("hardhat");
// const { time } = require("@nomicfoundation/hardhat-network-helpers");


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
      //    const mmitTokenFactory = await ethers.getContractFactory("MyToken");
        //  const mmitToken = await mmitTokenFactory.deploy("0x25E103D477025F9A8270328d84397B2cEE32D0BF",{
        //           gasPrice: ethers.parseUnits('10', 'gwei'), // Set a higher gas price
        //           gasLimit: 5000000 // Adjust the gas limit as needed
        //         });
      //    await mmitToken.waitForDeployment(5);

      //    const mmitTokenContractAddress = await mmitToken.getAddress();

      //    console.log("mmitTokenContractAddress",mmitTokenContractAddress);
   
      //    const stakingFacory = await ethers.getContractFactory("Staking");
      //    const staking = await upgrades.deployProxy(
      //      stakingFacory,
      //      ["0x9767c8E438Aa18f550208e6d1fDf5f43541cC2c8", "0xc8B994AC8Bf53320FFD94DdFC5029FEA0141322d"],
      //      { kind: "uups" }
      //  );
      //  const stakingContractAddress = await staking.getAddress();

      //  console.log("Staking Contract deployed to:", stakingContractAddress);

      //  const implementationContractAddressStaking = await upgrades.erc1967.getImplementationAddress(
      //    stakingContractAddress
      //   );

      //   console.log("implementationContractAddressStaking",implementationContractAddressStaking);

        await hre.run("verify:verify", {
         address:"0x8a7d9d8bbd5b9ed096d69788d889963cc3135578",
         constructorArguments: [],
     });


  
console.log("Verification Done")

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});