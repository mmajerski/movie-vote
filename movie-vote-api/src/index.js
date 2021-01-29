const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const {
  makeExecutableSchema,
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers
} = require("graphql-tools");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;

const typesArray = loadFilesSync(path.join(__dirname, "../typeDefs"));
const typeDefs = mergeTypeDefs(typesArray);

const resolversArray = loadFilesSync(path.join(__dirname, "../resolvers"));
const resolvers = mergeResolvers(resolversArray);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return {
      ...request
    };
  },
  introspection: true,
  playground: {
    endpoint: "/graphql"
  }
});

const app = express();
const server = createServer(app);
apolloServer.applyMiddleware({
  app
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

server.listen({ port }, () => {
  console.log("Server is running");
});
