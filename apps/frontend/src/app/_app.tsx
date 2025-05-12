// apps/frontend/src/app/_app.tsx
import { ApolloWrapper } from '../../lib/apollo/provider';  // Import du composant d'enveloppement Apollo

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
    return (
        <ApolloWrapper>
            <Component {...pageProps} />
        </ApolloWrapper>
    );
}

export default MyApp;
