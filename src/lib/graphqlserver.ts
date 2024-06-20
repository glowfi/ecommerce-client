import { registerUrql } from '@urql/next/rsc';
import { createClient, cacheExchange, fetchExchange } from '@urql/core';
import customFetch from './customfetch';

export const makeClient = (access_token?: string) => {
    return createClient({
        //@ts-ignore
        url: process.env.GRAPHQL_API_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
        //@ts-ignore
        fetch: customFetch
    });
};

export const createUrqlClient = (access_token?: string) =>
    registerUrql(() => makeClient(access_token)).getClient();

export const { getClient } = registerUrql(makeClient);
