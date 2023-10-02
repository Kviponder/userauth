const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require("./schemas");

const authMiddleware = require("./utils/auth");
const db = require("./config/connection");

const app = express();

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

async function startServer() {
  await server.start(); // Use the existing 'server' instance
  server.applyMiddleware({ app });
}

startServer(typeDefs, resolvers);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
