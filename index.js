const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const schema = buildSchema(`
  type User {
    id: String
    name: String
  }
  type Query {
    feed(username: String!): User
  }
`);

const root = {
  feed: ({ username }) => ({ id: '0123456', name: username})
};

app.use("/graphql", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path,
    }),
  }),
);

app.listen(8080, () => {
  console.log('Listening on port :8080/graphql'); // eslint-disable-line
});
