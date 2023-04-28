const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config({path:`${__dirname}/./../.env`});
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const infuraNode = 'https://sepolia.infura.io/v3/de8c88f43fcd4a20a0d34d7d8e6f8989';
const provider = new HDWalletProvider(
  'health opinion gallery uncover bread country mother humor supply scatter oven twelve',
  infuraNode
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: '3000000', from: accounts[0] });
  
    console.log('Contract deployed to ', result.options.address);
    provider.engine.stop();

  };
  deploy();