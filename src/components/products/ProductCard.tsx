'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { SkeletonCard } from '../product/SkeletonCard';
import AddtoCart from '../product/addtocart';
import { StarIcon } from '../ui/staricon';

const ProductCard = ({ product }: any) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <div
            key={product?.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
        >
            {!loaded && <SkeletonCard props={{ w: '300', h: '300' }} />}
            <Image
                onLoad={() => setLoaded(true)}
                src={product?.coverImage?.[0]}
                alt={product?.name}
                width={300}
                height={300}
                className="hover:opacity-50 h-64 transition-all w-full"
                onClick={() => {
                    router.push(`/product/${product?.id}`);
                }}
            />
            <div className="p-4 bg-white dark:bg-muted">
                <h3 className="font-bold text-lg">{product?.brand}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {product?.title}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product?.rating?.toFixed(1)}
                        </span>
                    </div>
                    <span className="font-semibold text-lg">
                        ${product?.price.toFixed(2)}
                    </span>
                    <AddtoCart currProduct={product} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
