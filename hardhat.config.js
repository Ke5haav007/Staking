require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19", // Add the first version
      },
      {
        version: "0.8.20", // Add the second version
      },
      {
        version: "0.6.12", // Add the third version
      }
    ]
  }
};
