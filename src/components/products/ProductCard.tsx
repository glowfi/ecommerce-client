'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { SkeletonCard } from '../product/SkeletonCard';
import AddtoCart from '../product/addtocart';
import { StarIcon } from '../ui/staricon';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const ProductCard = ({ product }: any) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <div
            key={product?.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
        >
            {product?.discountPercent !== 0 && (
                <div className="absolute top-4 left-4  px-3 py-1 rounded-full text-xs font-medium">
                    <Badge>{product?.discountPercent}% Off</Badge>
                </div>
            )}
            {!loaded && <SkeletonCard props={{ w: '200', h: '200' }} />}
            <Image
                onLoad={() => setLoaded(true)}
                src={product?.coverImage?.[0]}
                alt={'Not Found!'}
                width={200}
                height={200}
                className="h-64 transition-all w-full object-cover"
                onClick={() => {
                    router.push(`/product/${product?.id}`);
                }}
            />
            <div className="p-4 bg-white dark:bg-muted">
                <div className="flex flex-wrap gap-3">
                    <h3
                        className="font-bold text-lg hover:animate-in hover:cursor-pointer"
                        onClick={() => {
                            router.push(`product/search?q=${product?.brand}`);
                        }}
                    >
                        {product?.brand}
                    </h3>
                    <Badge
                        className="border-b hover:animate-in hover:cursor-pointer"
                        onClick={() => {
                            router.push(
                                `product/bycategories?q=${product?.categoryName}`
                            );
                        }}
                    >
                        {product?.categoryName}
                    </Badge>
                </div>
                <Link
                    className="text-gray-500 dark:text-gray-400 text-sm mt-2 hover:underline transition-all hover:animate-in"
                    href={`/product/${product?.id}`}
                >
                    {product?.title}
                </Link>
                <div className="flex flex-wrap justify-between items-center mt-3 gap-3">
                    <div className="flex gap-1 justify-center items-center">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product?.rating?.toFixed(1)}
                        </span>
                    </div>

                    {product?.discountPercent ? (
                        <div className="flex">
                            <span className="text-lg font-bold mr-2">
                                $
                                {(
                                    ((100 - product?.discountPercent) / 100) *
                                    product?.price
                                ).toFixed(0)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-lg font-bold mr-2">
                            ${product.price.toFixed(2)}
                        </span>
                    )}
                    <AddtoCart currProduct={product} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
