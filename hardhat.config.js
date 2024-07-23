require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      // Add more compiler versions as needed
    ],
  },

  networks: {
    bscTestNet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [process.env.PVT_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY 
  },
  sourcify: {
    enabled: true
  }
};
