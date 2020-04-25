import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import { createCourse, issueCert } from './ethereum';
import { upload, download } from './ipfs';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});