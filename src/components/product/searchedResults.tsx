'use client';
import { SearchTermPaginateDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { usesearchStore } from '../navbar/store';
import ProductCard from '../products/ProductCard';
import InfiniteScroll from '../ui/InfinteScroll';
import { TOTAL_ITEMS } from './constants';

const SearchedResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const storeQuery = usesearchStore((state: any) => state.query);
    const oldquery = usesearchStore((state: any) => state.oldquery);

    const searchProducts = usesearchStore((state: any) => state.searchProducts);
    const paginate = usesearchStore((state: any) => state.paginate);
    const page = usesearchStore((state: any) => state.pageIdx);
    const loading = usesearchStore((state: any) => state.loading);
    const hasMore = usesearchStore((state: any) => state.hasMore);

    // if query firsttime
    if (!storeQuery && !oldquery) {
        usesearchStore.setState({ query });
        usesearchStore.setState({ oldquery: query });
    }
    // if query with new query params
    else if (oldquery !== query) {
        usesearchStore.setState({ pageIdx: 0 });
        usesearchStore.setState({ hasMore: true });
        usesearchStore.setState({ searchProducts: [] });
        usesearchStore.setState({ oldquery: storeQuery });
        usesearchStore.setState({ query });
    }

    const next = async () => {
        usesearchStore.setState({ loading: true });

        setTimeout(async () => {
            console.log(query);
            const { data } = await getClient().query(
                SearchTermPaginateDocument,
                {
                    term: storeQuery as string,
                    skipping: TOTAL_ITEMS * page,
                    limit: TOTAL_ITEMS
                },
                { requestPolicy: 'network-only' }
            );

            console.log(data);

            paginate(data?.getProductsBySearchTermPaginate?.data);
            usesearchStore.setState({ pageIdx: page + 1 });
            // setPage((prev) => prev + 1);

            // Usually your response will tell you if there is no more data.
            if (
                data?.getProductsBySearchTermPaginate?.data?.length <
                TOTAL_ITEMS
            ) {
                usesearchStore.setState({ hasMore: false });
            }
            usesearchStore.setState({ loading: false });
        }, 300);
    };

    return (
        <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {searchProducts?.map((p: any, idx: any) => {
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
                        <Loader2 className="my-4 h-8 w-8 animate-spin" />
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
};

export default React.memo(SearchedResults);
