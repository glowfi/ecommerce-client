'use client';
import { CategoriesDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import React, { useEffect, useState } from 'react';
import Categorycard from './categorycard';
import { usecategoryStore } from './store';
import LoadingSpinner from '../loadingspinners/loadingspinner';

const loadData = async () => {
    console.log('alwawys run!');
    const data = await getClient().query(CategoriesDocument, {});

    if (data?.data?.getAllCategories?.data) {
        usecategoryStore.setState({
            allCategories: data?.data?.getAllCategories?.data
        });
    }
    return data;
};

const Categories = () => {
    const allCat = usecategoryStore((state: any) => state.allCategories);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        loadData().then((data) => {
            if (data?.data?.getAllCategories?.data) {
                setFetching(false);
            }
        });
    }, []);

    if (fetching) {
        return <LoadingSpinner name="Categories" />;
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                Shop by Categories
            </h2>

            <div className="grid justify-center items-center justify-items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Categorycard allCat={allCat} />
            </div>
        </div>
    );
};

export default React.memo(Categories);
