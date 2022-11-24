//This is the un-optimzed test code, check Token.js which uses fixtures to optimize test time

// Writing automated tests when building smart contracts is of crucial importance, as your user's money is what's at stake.
// To test our contract, we are going to use Hardhat Network, a local Ethereum network designed for development. 
// It comes built-in with Hardhat, and it's used as the default network. You don't need to setup anything to use it.

// A popular JavaScript assertion library used for application testing
const { expect } = require("chai");
// The ethers variable is available in the global scope. 
// but if you like your code always being explicit you can put it here
const { ethers } = require("hardhat");

describe("Token contract - no fixture", function () {

    it("Deployment should assign the total supply of tokens to the owner", async function () {
    // A Signer in ethers.js is an object that represents an Ethereum account. 
    // It's used to send transactions to contracts and other accounts. 
    // Here we're getting a list of the accounts in the node we're connected to, 
    // which in this case is Hardhat Network, and we're only keeping the first one.
    const [owner] = await ethers.getSigners();

    // A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts
    // so Token here is a factory for instances of our token contract.
    const Token = await ethers.getContractFactory("Token");

    // Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. 
    // This is the object that has a method for each of your smart contract functions.
    const hardhatToken = await Token.deploy();

    // Once the contract is deployed, we can call our contract methods on hardhatToken. 
    // Here we get the balance of the owner account by calling the contract's balanceOf() method.
    const ownerBalance = await hardhatToken.balanceOf(owner.address);

    // Here we're again using our Contract instance to call a smart contract function in our Solidity code. 
    // totalSupply() returns the token's supply amount and we're checking that it's equal to ownerBalance, as it should be.
    // expect from chai library is used to verify the validity of this assertion (true = passing).
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });


    it("Should transfer tokens between accounts", async function() {
    // If you need to test your code by sending a transaction from an account (or Signer in ethers.js terminology) 
    // other than the default one, you can use the connect() method on your ethers.js Contract object to connect it to a different account, like L.52
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });

});