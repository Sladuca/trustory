import IPFS from 'ipfs-http-client';

let node;

export const initIpfs = async () => {
  node = await IPFS.create();
};

export const upload = async (data) => {
  if (!node) {
    throw new Error('IPFS node not initialized!');
  }
  const files = await node.add(data);
  return files[0].hash;
};

export const download = async (uri) => {
  if (!node) {
    throw new Error('IPFS node not initialized!');
  }
  const data = await node.cat(uri);
  return data.toString();
};

