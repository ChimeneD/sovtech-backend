import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../schema/schema';
import { resolvers } from '../resolver/resolver';

const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  //creating express app
  const app = express();
  app.use(express.json());
  //creating apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error: any) => {
      return error;
    },
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 server started on  http://localhost:${PORT}`);
  });
}

startApolloServer();
