import * as IPFS from 'ipfs';

let node;

export const initIpfs = async () => {
  node = await IPFS.create();
};

export const upload = async (data) => {
  if (!node) {
    throw new Error('IPFS node not initialized!');
  }
  const files = node.add(data);
  let results = []
  for await (const res of files) {
    results.push(res.cid);
  };
  return results[0].toString();
};

export const download = async (uri) => {
  if (!node) {
    throw new Error('IPFS node not initialized!');
  }
  const data = await node.cat(uri);
  return data.toString();
};

