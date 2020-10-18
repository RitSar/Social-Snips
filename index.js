const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const {MONGODB} = require('./config.js');


const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=>{
  console.log("Database connected.");
  return server.listen({ port: 4000 });
}).then(res=>{
  console.log(`Server running at ${res.url}`);
});