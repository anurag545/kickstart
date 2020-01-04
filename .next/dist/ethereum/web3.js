'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Web3 = require('web3');
var HDWalletProvider = require('truffle-hdwallet-provider');
var web3 = void 0;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {

    var provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/0893442b2a454e5f9bb9424b7e4de73e');
    web3 = new Web3(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFx3ZWIzLmpzIl0sIm5hbWVzIjpbIldlYjMiLCJyZXF1aXJlIiwiSERXYWxsZXRQcm92aWRlciIsIndlYjMiLCJ3aW5kb3ciLCJjdXJyZW50UHJvdmlkZXIiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNLE9BQU8sQUFBUCxBQUFOO0FBQ0EsSUFBTSxtQkFBbUIsQUFBbkIsQUFBTjtBQUNBLElBQUksWUFBSjtBQUNBLElBQUcsT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sT0FBTyxBQUFkLFNBQXNCLEFBQTFELGFBQXVFLEFBQ25FO1dBQU8sSUFBSSxBQUFKLEtBQVMsT0FBTyxBQUFQLEtBQVksQUFBckIsQUFBUCxBQUNIO0FBRkQsT0FFTSxBQUVGOztRQUFNLFdBQVcsSUFBSSxLQUFLLEFBQUwsVUFBZSxBQUFuQixhQUFnQyxBQUFoQyxBQUFqQixBQUNBO1dBQU8sSUFBSSxBQUFKLEtBQVMsQUFBVCxBQUFQLEFBQ0g7QUFFRDs7a0JBQWUsQUFBZiIsImZpbGUiOiJ3ZWIzLmpzIiwic291cmNlUm9vdCI6IkQ6L2tpY2tzdGFydCJ9