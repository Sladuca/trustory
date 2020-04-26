import dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

import HDWalletProvider from 'truffle-hdwallet-provider';
import multihashes from 'multihashes'
import Web3 from 'web3';

if (!process.env.MNEMONIC || !process.env.WEB3_PROVIDER_ADDRESS || !process.env.ABI || !process.env.CONTRACT_ADDRESS) {
  throw new Error('Mnmemonic, web3 provider, contract address, and abi required!');
}
const web3 = new Web3(new HDWalletProvider(process.env.MNEMONIC, process.env.WEB3_PROVIDER_ADDRESS));
const abi = JSON.parse(fs.readFileSync(process.env.ABI));
const address = process.env.CONTRACT_ADDRESS;
const contract = web3.eth.contract(abi).at(address);

const account = async () => {
  try {
    const accounts = await web3.eth.getAccounts;
    return accounts[0];
  } catch (err) {
    throw new Error('failed get ethereum account!');
  }
};

// **********************************
// Taken from https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes

const ipfs2multihash = (hash) => {
  let mh = multihashes.fromB58String(Buffer.from(hash));
  return {
    hashFunction: '0x' + mh.slice(0, 2).toString('hex'),
    digest: '0x' + mh.slice(2).toString('hex'),
    size: mh.length - 2
  };
},

// *********************************

export const createCourse = async (id, uri) => {
  const { hashFunction, digest, size } = ipfs2multihash(uri);
  try {
    await contract.createCourse(id, hashFunction, size, digest, {
      from: await account()
    })
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

export const issueCert = async (recipient, courseUri, uri) => {
  const { hashFunction, digest, size } = ipfs2multihash(uri);
  try {
    const id = await contract.issueCert(recipient, courseUri, hashFunction, size, digest);
    return id;
  } catch (err) {
    console.error(err.message)
    return null;
  }
};
