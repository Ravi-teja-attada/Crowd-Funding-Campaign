import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' ){
    // rendering inside browser and has metamask installed init

    window.ethereum.request({method:'eth_requestAccounts'});
    web3 = new Web3(window.ethereum);
}else{
    // rendering on next server or metamask not installed in browser

    const provider = new Web3.providers.HttpProvider(
        'https://goerli.infura.io/v3/c87ddb98e34041c690fd52ea034c45e2'
    );

    web3 = new Web3(provider);
}



export default web3;