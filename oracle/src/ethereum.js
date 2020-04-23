import dotenv from 'dotenv';

dotenv.config();

import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';

if (!process.env.MNEMONIC || !process.env.WEB3_PROVIDER_ADDRESS || !process.env.ABI || !process.env.CONTRACT_ADDREss) {
  throw new Error('Mnmemonic, web3 provider, contract address, and abi required!');
}
const web3 = new Web3(new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS));
const abi = JSON.parse(process.env.ABI);
const address = process.env.CONTRACT_ADDRESS;
const contract = web3.eth.contract(abi).at(address);

const account = async () => {
  try {
    const accounts = await web3.eth.getAccounts;
    return accounts[0]
  } catch (err) {
    throw new Error('failed get ethereum account!')
  }
}

export const createCourse = async () => {
  return "unimplemented"
}

export const issueCert = async () => {
  return "unimplemented"
}
