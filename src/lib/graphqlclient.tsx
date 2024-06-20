'use client';

import {
    UrqlProvider,
    cacheExchange,
    createClient,
    fetchExchange,
    ssrExchange
} from '@urql/next';

import { useMemo } from 'react';
import customFetch from './customfetch';

export default function Provider({ children }: React.PropsWithChildren) {
    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange();

        const client = createClient({
            //@ts-ignore
            url: process.env.GRAPHQL_API_ENDPOINT,
            exchanges: [cacheExchange, ssr, fetchExchange],
            //@ts-ignore
            fetch: customFetch,
            suspense: true
        });

        return [client, ssr];
    }, []);

    return (
        <UrqlProvider client={client} ssr={ssr}>
            {children}
        </UrqlProvider>
    );
}
