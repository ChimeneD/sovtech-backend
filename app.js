const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');
const PORT = process.env.PORT || 4000;
//https://sovtech-test-backend.herokuapp.com/graphql
async function startApolloServer() {
  //creating express app
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
    }),
  );

  app.get('/', (req, res) => {
    res.send('/index.html');
  });
  //creating apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (error) => {
      return error;
    },
    graphiql: true,
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
