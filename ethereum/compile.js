const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');

fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
      'campaign.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['campaign.sol'];

  fs.ensureDirSync(buildPath);
  console.log(output);

  for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    )
  }