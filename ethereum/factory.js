import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x28863dcF267233F9a32784e4A7e5c1Acaa06147D'
);

export default instance;