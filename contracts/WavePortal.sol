// SPDX-License-Identifier: UNLICENSED

/*
The blockchain = Think of it as a cloud provider, kinda like AWS, but it's owned by no one. 
It's run by compute power from mining machines all over the world. Usually these people are called miners and we pay them to run our code!


A smart contract = Kinda like our server's code with different functions people can hit.
*/
pragma solidity ^0.8.4; //Version of the Solidity compiler

import "hardhat/console.sol"; //hard to debug smart contracts

contract WavePortal {
    // state variable (permanently stored) set at 0
    uint256 totalWaves;

    constructor() {
        console.log("Jacks smart contract");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}