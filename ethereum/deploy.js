const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');

const compiledMaster=require('./build/Master.json');

const provider=new HDWalletProvider(
'wheel tuition cram donor width march film stadium spray like oxygen prison',
'https://rinkeby.infura.io/v3/3302af5418fc45af83abb5902d4635f1'

);
const web3=new Web3(provider);
console.log('In the Deployment Process');
const deploy=async()=>{
    const accounts=await web3.eth.getAccounts();
    console.log('Attempting to deploy from',accounts[0]);
    console.log('Balance before deploying ',await web3.eth.getBalance(accounts[0]));
    try {

      result=await new web3.eth.Contract(JSON.parse(compiledMaster.interface))
      .deploy({data:compiledMaster.bytecode,arguments: ['200','100','50','20']})
      .send({from:accounts[0],gas:'5000000',gasPrice:'40000000000'});


    } catch (e) {
          console.log("Error Occured",e);

    } finally {
      console.log("Close Deployment Process");
    }


console.log('Deployed to',result.options.address);
console.log('Balance after deploying ',await web3.eth.getBalance(accounts[0]));
};
deploy();
