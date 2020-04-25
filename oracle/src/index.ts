import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import * as ethereum from './ethereum';
import * as ipfs from './ipfs';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
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