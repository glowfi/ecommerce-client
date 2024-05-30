import { registerUrql } from '@urql/next/rsc';
import { createClient, cacheExchange, fetchExchange } from '@urql/core';

export const makeClient = (access_token?: string) => {
    return createClient({
        //@ts-ignore
        url: process.env.GRAPHQL_API_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
        fetchOptions: () => {
            const headers = {};

            if (access_token) {
                //@ts-ignore

                headers['Authorization'] = `Bearer ${access_token}`;
            }

            return { headers, credentials: 'include' };
        }
    });
};

export const createUrqlClient = (access_token?: string) =>
    registerUrql(() => makeClient(access_token)).getClient();

export const { getClient } = registerUrql(makeClient);
