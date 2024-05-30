'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { useProductsStore } from './store';

const Products = () => {
    const allProds = useProductsStore((state: any) => state.allProducts);

    return (
        <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {allProds?.map((p: any, idx: any) => {
                return (
                    <ProductCard
                        imageLink={p?.coverImage?.[0]}
                        name={p?.brand}
                        title={p?.title}
                        category={p?.category?.name}
                        price={p?.price}
                        id={p?.id}
                        key={idx}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(Products);
