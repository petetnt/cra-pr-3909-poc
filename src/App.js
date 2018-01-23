import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import logo from './logo.svg';
import './App.css';
import graphqlFile from './test.graphql';
import gqlFile from './test.gql';

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache()
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      apollo: null,
      apollo2: null,
    }
  }
  componentDidMount() {
    client.query({ query: graphqlFile }).then(data => {
      this.setState(() => ({
        apollo: data,
      }));
    });
    client.query({ query: gqlFile }).then(data => {
      this.setState(() => ({
        apollo2: data,
      }));
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <h1>Apollo test:</h1>
          <div>Data with Apollo: {!this.state.apollo ? 'loading...' : JSON.stringify(this.state.apollo)}</div>
          <div>Data with Apollo (alt): {!this.state.apollo2 ? 'loading...' : JSON.stringify(this.state.apollo2)}</div>
        </div>
      </div>
    );
  }
}

export default App;
