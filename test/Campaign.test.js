const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CompaignFactory.json');
const compiledCampaign = require('../ethereum/build/Compaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data:'0x'+compiledFactory.bytecode }).send({from : accounts[0],gas: 4712388,
        gasPrice: 100000000000});
    await factory.methods.createCompaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });
    [campaignAddress] = await factory.methods.getDeployedCompaign().call();


    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaign', ()=>{
    it('deploys a contract', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('marks caller as campaign manager', async ()=> {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    });

    it('allow ppl to contribute and marks them as aprovvers',async ()=> {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires minimum contribution',async () => {
        try{
            await campaign.methods.contribute().send({
            from: accounts[1],
            value:'5'
            });
            assert(false);
        } catch(err) {
            assert(err);
        }
    });

    // it('allows a manager to make a payment request', async () => {
    //     console.log(accounts[1],accounts[0]);
    //     await campaign.methods.createRequest('Buy Batteries',100,accounts[1]).send({
    //         from: await campaign.methods.manager().call(),
    //         gas: 4712388,
    //         gasPrice: 100000000000
    //     });
    //     // const request = await campaign.methods.requests(0).call();
    //     // assert.equal('Buy Batteries',request.description);
    // });

    it('process request',async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10','ether')
            });
        await campaign.methods
            .createRequest('A',web3.utils.toWei('5','ether'),accounts[1])
            .send({from: accounts[0],gas: '1000000'});
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance >104);
    });


})