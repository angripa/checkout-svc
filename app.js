var express = require('express');
var { graphqlHTTP } = require('express-graphql');


// Construct a schema, using GraphQL schema language
const schema = require('./graphql/schema.js')

// The root provides a resolver function for each API endpoint
const root = require('./graphql/resolvers.js')
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');