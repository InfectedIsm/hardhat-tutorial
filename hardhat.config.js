// When Hardhat is run, it searches for the closest hardhat.config.js file starting from the current working directory. 
// This file normally lives in the root of your project and an empty hardhat.config.js is enough for Hardhat to work. 
// The entirety of your setup is contained in this file.

require("@nomicfoundation/hardhat-toolbox");

// I have added this line + the .env file (which is excluded from repo in the .gitignore file) 
// API keys and other private keys should never be present in your publicly available code
// this line load the .env variable when running the script and contain the keys
// you will need to install dotenv for that 'npm install dotenv --save'
require("dotenv").config();


// Moved this to .env file to store sensitive information.
// const GOERLI_PRIVATE_KEY = "YOUR GOERLI PRIVATE KEY";
// const INFURA_API_KEY = "KEY";


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  }
};
