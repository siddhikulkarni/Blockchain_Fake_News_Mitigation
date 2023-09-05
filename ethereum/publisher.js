import web3 from './web3';
import Publisher from './build/Publisher.json';

export default address =>{
  return new web3.eth.Contract(
    JSON.parse(Publisher.interface),
    address
  );
};
