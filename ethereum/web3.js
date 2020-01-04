const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
let web3;
if(typeof window !== 'undefined' && typeof window.web3 !=='undefined') {
    web3 = new Web3(window.web3.currentProvider);
}else {
    
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/0893442b2a454e5f9bb9424b7e4de73e');
    web3 = new Web3(provider); 
}

export default web3;