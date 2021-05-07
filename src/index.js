import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = new WebSocketLink({
  uri: `${process.env.REACT_APP_HASURA_URI}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":`${process.env.REACT_APP_HASURA_PASS}`
      }
    }
  }
})
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
   <ApolloProvider client={client}> 
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
