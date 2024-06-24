'use client';

import { PaginateProdDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProductsStore } from './store';
import InfiniteScroll from '../ui/InfinteScroll';
import { TOTAL_ITEMS } from './constants';
import LoadingSpinner from '../loadingspinners/loadingspinner';

const Products = () => {
    const allProds = useProductsStore((state: any) => state.allProducts);
    const paginate = useProductsStore((state: any) => state.paginate);
    const page = useProductsStore((state: any) => state.pageIdx);
    const loading = useProductsStore((state: any) => state.loading);
    const hasMore = useProductsStore((state: any) => state.hasMore);
    const reset = useProductsStore((state: any) => state.reset);

    useEffect(() => {
        

        return () => {
            reset();
            
        };
    }, []);

    const next = async () => {
        useProductsStore.setState({ loading: true });
        setTimeout(async () => {
            const { data } = await getClient().query(PaginateProdDocument, {
                skipping: TOTAL_ITEMS * page,
                limit: TOTAL_ITEMS
            });

            paginate(data?.getAllProductsPaginate?.data);
            useProductsStore.setState({ pageIdx: page + 1 });

            // Usually your response will tell you if there is no more data.
            // @ts-ignore
            if (data?.getAllProductsPaginate?.data?.length < TOTAL_ITEMS) {
                useProductsStore.setState({ hasMore: false });
            }
            useProductsStore.setState({ loading: false });
        }, 0);
    };
    return (
        <>
            <section className="py-6 md:py-12 lg:py-16">
                <div className="container px-4 md:px-6">
                    <h2 className="text-2xl font-bold mb-8">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allProds?.map((product: any, idx: any) => (
                            <ProductCard
                                key={idx}
                                product={{
                                    ...product,
                                    category: product?.category?.name
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <InfiniteScroll
                hasMore={hasMore}
                isLoading={loading}
                next={next}
                threshold={1}
            >
                {hasMore && (
                    <div className="m-auto flex justify-center items-center justify-items-center">
                        <LoadingSpinner name="products" />
                    </div>
                )}
            </InfiniteScroll>
        </>
    );
};

export default React.memo(Products);
