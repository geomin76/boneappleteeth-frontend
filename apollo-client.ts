import { ApolloClient, InMemoryCache,createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
  
  const client = new ApolloClient({
    uri: 'https://api.yelp.com/v3/graphql',
    cache: new InMemoryCache()
  });

export default client;