'use client';
import React, { useEffect } from 'react';
import { gql, useQuery } from 'urql';

const TodosQuery = gql`
    query {
        helloList
    }
`;
const Comp1 = () => {
    const [result, reexecuteQuery] = useQuery({
        query: TodosQuery
    });

    useEffect(() => {
        if (result.fetching) return;

        // Set up to refetch in one second, if the query is idle
        const timerId = setTimeout(() => {
            reexecuteQuery({ requestPolicy: 'network-only' });
        }, 1000);

        return () => clearTimeout(timerId);
    }, [result.fetching, reexecuteQuery]);

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return <div>{JSON.stringify(data)}</div>;
};

export default Comp1;
