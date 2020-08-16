import ApolloClient from 'apollo-boost';
import unfetch from 'isomorphic-unfetch';

let apolloClient: ApolloClient<unknown>;

export const createApolloClient = () => {
  if (!apolloClient)
    apolloClient = new ApolloClient({
      uri: process.env.COVID_API_URL,
      fetch: fetch || unfetch,
    });

  return apolloClient;
};
