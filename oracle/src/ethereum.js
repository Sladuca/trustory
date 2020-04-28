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
const abi = JSON.parse(fs.readFileSync(process.env.ABI, 'utf8').toString());
const address = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, address);

const account = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
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
    hashFunction: '0x' + mh.slice(0, 1).toString('hex'),
    size: '0x' + mh.slice(1, 2).toString('hex'),
    digest: '0x' + mh.slice(2).toString('hex'),
  };
},

// *********************************

export const createCourse = async (id, uri) => {
  const { hashFunction, digest, size } = ipfs2multihash(uri);
  const oracle = await account();
  await contract.methods.createCourse(id, hashFunction, size, digest).send({
      from: oracle
    });
  return true;
};

export const issueCert = async (recipient, courseUri, uri) => {
  const { hashFunction, digest, size } = ipfs2multihash(uri);
  const oracle = await account();
  // console.log(recipient, courseUri, hashFunction, size, digest)
  const id = await contract.methods.issueCert(recipient, courseUri, hashFunction, size, digest).send({
    from: oracle
  });
  // console.log(id);
  return true;
};
