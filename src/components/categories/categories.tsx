'use client';
import { CategoriesDocument } from '@/gql/graphql';
import { useQuery } from '@urql/next';
import React from 'react';
import Categorycard from './categorycard';
import { usecategoryStore } from './store';

const Categories = () => {
    const allCat = usecategoryStore((state: any) => state.allCategories);

    const [result, reexecuteQuery] = useQuery({
        query: CategoriesDocument
    });
    const { data, fetching, error } = result;

    if (fetching) {
        return <h1>Loading ...</h1>;
    }

    if (data?.getAllCategories?.data) {
        usecategoryStore.setState({
            allCategories: data?.getAllCategories?.data
        });
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                Shop by Categories
            </h2>

            <div className="grid justify-center items-center justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Categorycard allCat={allCat} />
            </div>
        </div>
    );
};

export default React.memo(Categories);
