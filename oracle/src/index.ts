import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import * as ethereum from './ethereum';
import * as ipfs from './ipfs';

import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  ethereum: any;
  ipfs: any;
}

const prisma = new PrismaClient();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      prisma,
      ethereum,
      ipfs
    }
  }
});

ipfs.initIpfs().then(() => {
  return server.listen()
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});