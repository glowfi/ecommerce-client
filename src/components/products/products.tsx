'use client';

import { PaginateProdDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { Loader2 } from 'lucide-react';
import React from 'react';
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
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
                Shop by Products
            </h2>
            <div className="container mx-auto p-4 mt-6 flex justify-center items-center">
                <div className="grid -cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                    {allProds?.map((p: any, idx: any) => {
                        return (
                            <ProductCard
                                key={idx}
                                currProduct={{
                                    ...p,
                                    category: p?.category?.name
                                }}
                            />
                        );
                    })}

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
                </div>
            </div>
        </>
    );
};

export default React.memo(Products);
