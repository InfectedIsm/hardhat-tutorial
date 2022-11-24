// Scripts can be executed using the 'npx hardhat run <script-path>' command.
// This one deploy the contract, by default it will deploy it on the local instance of the Hardhat Network.
// But you can add '--network <network-name>' at the end of the first command to deploy it elsewhere.
// It can be on the Mainnet or on a testnet like Goerli or Sepolia
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    console.log("Token address:", token.address);
    }

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }
);