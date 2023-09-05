const assert=require('assert');
const ganache= require('ganache-cli');
const Web3 = require('web3');

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledMaster=require('../ethereum/build/Master.json');
const compiledPublisher=require('../ethereum/build/Publisher.json');

let accounts;
let master;
let publisherAddress;
let publisher;

beforeEach(async()=>{
  accounts=await web3.eth.getAccounts();

  master=await new web3.eth.Contract(JSON.parse(compiledMaster.interface))
  .deploy({data:compiledMaster.bytecode,arguments: [200,100,50,20]})
  .send({from:accounts[0],gas:'3000000',gasPrice:'40000000000'});

  await master.methods.Enroll("First","Sport").send({
    from:accounts[0],
    gas:'3000000',
    gasPrice:'40000000000',
    value:'200'
  });
  master.setProvider(provider);
  [publisherAddress]=await master.methods.getDeployedPublishers().call();

  publisher=await new web3.eth.Contract(JSON.parse(compiledPublisher.interface),
  publisherAddress
);
  publisher.setProvider(provider);
});

  describe('Publisher',()=>{
      it('deploys a master and publisher',()=>{
        assert.ok(master.options.address);
        assert.ok(publisher.options.address);
      });

  });
