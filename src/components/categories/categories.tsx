'use client';
import { CategoriesDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import React, { useEffect, useState } from 'react';
import Categorycard from './categorycard';
import { usecategoryStore } from './store';
import LoadingSpinner from '../loadingspinners/loadingspinner';

const loadData = async () => {
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
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Categorycard categories={allCat} />
                </div>
            </div>
        </section>
    );
};

// <Categorycard allCat={allCat} />
export default React.memo(Categories);
