import web3 from './web3';
import Master from './build/Master.json';


const instance=new web3.eth.Contract(
  JSON.parse(Master.interface),
  '0xA53c5F8b17e28DC1147E2f6Ace2F11De1C80316D'
);
export default instance;
