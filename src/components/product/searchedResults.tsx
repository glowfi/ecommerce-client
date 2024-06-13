'use client';
import { SearchTermPaginateDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { usesearchStore } from '../navbar/store';
import ProductCard from '../products/ProductCard';
import InfiniteScroll from '../ui/InfinteScroll';
import { TOTAL_ITEMS } from './constants';
import { useRouter } from 'next/navigation';

const SearchedResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const router = useRouter();

    if (!query) {
        router.push('/');
    }
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
            const { data } = await getClient().query(
                SearchTermPaginateDocument,
                {
                    term: storeQuery as string,
                    skipping: TOTAL_ITEMS * page,
                    limit: TOTAL_ITEMS
                },
                { requestPolicy: 'network-only' }
            );

            paginate(data?.getProductsBySearchTermPaginate?.data);
            usesearchStore.setState({ pageIdx: page + 1 });
            // setPage((prev) => prev + 1);

            // Usually your response will tell you if there is no more data.
            if (
                // @ts-ignore
                data?.getProductsBySearchTermPaginate?.data?.length <
                TOTAL_ITEMS
            ) {
                usesearchStore.setState({ hasMore: false });
            }
            usesearchStore.setState({ loading: false });
        }, 0);
    };

    return (
        <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {searchProducts?.map((p: any, idx: any) => {
                return (
                    <ProductCard
                        key={idx}
                        currProduct={{
                            ...p,
                            category: p?.categoryName
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
                        <LoadingSpinner name="results" />
                    </div>
                )}
            </InfiniteScroll>
        </div>
    );
};

export default React.memo(SearchedResults);
