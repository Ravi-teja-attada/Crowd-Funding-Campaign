import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' ){
    // rendering inside browser and has metamask installed init

    window.ethereum.request({method:'eth_requestAccounts'});
    web3 = new Web3(window.ethereum);
}else{
    // rendering on next server or metamask not installed in browser

    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/de8c88f43fcd4a20a0d34d7d8e6f8989'
    );

    web3 = new Web3(provider);
}



export default web3;