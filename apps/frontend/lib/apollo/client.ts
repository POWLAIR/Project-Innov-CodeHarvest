// apps/frontend/lib/apollo/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
  credentials: 'include', // ou 'same-origin' si cookies
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
