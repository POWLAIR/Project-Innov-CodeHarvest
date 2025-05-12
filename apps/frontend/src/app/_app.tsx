// apps/frontend/src/app/_app.tsx
import { ApolloWrapper } from '../../lib/apollo/provider';  // Import du composant d'enveloppement Apollo
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloWrapper>
            <Component {...pageProps} />
        </ApolloWrapper>
    );
}

export default MyApp;
