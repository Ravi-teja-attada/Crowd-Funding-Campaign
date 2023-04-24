import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x8AcF31C9e1428bFE603e1Cc14242bB9bb5F84B93'
);

export default instance;