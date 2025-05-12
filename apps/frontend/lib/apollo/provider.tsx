// apps/frontend/lib/apollo/provider.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from './client';  // Import du client Apollo configuré précédemment

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
