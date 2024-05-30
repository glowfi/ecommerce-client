'use client';
import { useSearchParams } from 'next/navigation';
import { usesearchStore } from '../navbar/store';
import ProductCard from '../products/ProductCard';
import React, { useEffect } from 'react';

const SearchedResults = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const searchProducts = usesearchStore((state: any) => state.searchProducts);
    const fetchProducts = usesearchStore((state: any) => state.fetchProducts);
    useEffect(() => {
        fetchProducts(query);
    }, [query]);

    return (
        <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {searchProducts?.map((p: any, idx: any) => {
                return (
                    <ProductCard
                        key={idx}
                        currProduct={{ ...p, category: p?.category?.name }}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(SearchedResults);
