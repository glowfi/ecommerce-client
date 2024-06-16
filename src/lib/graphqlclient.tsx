'use client';

import {
    UrqlProvider,
    cacheExchange,
    createClient,
    fetchExchange,
    ssrExchange
} from '@urql/next';

import { useMemo } from 'react';

export default function Provider({ children }: React.PropsWithChildren) {
    const [client, ssr] = useMemo(() => {
        const ssr = ssrExchange();

        const client = createClient({
            //@ts-ignore
            url: process.env.GRAPHQL_API_ENDPOINT,
            exchanges: [cacheExchange, ssr, fetchExchange],
            fetchOptions: () => {
                const headers: any = {};

                headers['ngrok-skip-browser-warning'] = 1;

                // if (access_token) {
                //     headers['Authorization'] = `Bearer ${access_token}`;
                // }

                return { headers, credentials: 'include' };
            },
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
