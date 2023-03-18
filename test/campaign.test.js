const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');
const { beforeEach, describe, it } = require('mocha');

let accounts;
let factory;
let campaign;
let campaignAddress;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: compiledFactory.evm.bytecode.object})
        .send({from: accounts[0], gas:'3000000'});
    
    await factory.methods.createCampaign('1000').send({
        from: accounts[1], gas:'3000000'
    });
    let addresses;
    addresses = await factory.methods.getDeployedContracts().call({from:accounts[1]});
    campaignAddress = addresses[0];

    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaigns', ()=>{
    it('deploys campaignFactory and campaign', ()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('has manager', async()=>{
        const manager = await campaign.methods.owner().call({from: accounts[2]});
        assert.equal(manager, accounts[1]);
    });

    it('allows you to contibute', async()=>{
        await campaign.methods.contribute().send({
            from: accounts[2], value:'2000'
        });
        const contributers = await campaign.methods.approvers(accounts[2]).call();
        assert(contributers);
    })

    it('requires min contribution',async()=>{
        try {
            await campaign.methods.contribute().send({
                    from: accounts[2], value:'2000'
                });
                assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allows owner to make a request', async()=>{
        await campaign.methods.spendRequest('5000','Electronic parts', accounts[5]).send({from: accounts[1], gas:'1000000'});
        const request = await campaign.methods.requests(0).call();
        assert.ok(request);
    });

    it('works from end to end', async()=>{
        await campaign.methods.contribute().send({
            from : accounts[2], value:'10000'
        });
        await campaign.methods.contribute().send({
            from : accounts[3], value:'10000'
        });
        await campaign.methods.spendRequest('5000', 'packing materials', accounts[5]).send({
            from: accounts[1], gas:'1000000'
        });

        await campaign.methods.approveRequest(0).send({from:accounts[2], gas:'1000000'});
        await campaign.methods.approveRequest(0).send({from:accounts[3], gas:'1000000'});

        const initial = await web3.eth.getBalance(accounts[5]);
        console.log(initial);
        await campaign.methods.finalizeRequest(0).send({from:accounts[1]});
        const final = await web3.eth.getBalance(accounts[5]);
        console.log(final);
        assert(final>initial);
    })
})