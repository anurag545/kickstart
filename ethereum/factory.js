import web3 from './web3';
import CompaignFactory from './build/CompaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CompaignFactory.interface),'0x5561426118acc04051e60AE6b3179fD639111b07');

export default instance;