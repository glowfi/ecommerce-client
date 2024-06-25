'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SkeletonCard } from '../product/SkeletonCard';
import AddtoCart from '../product/addtocart';
import { Badge } from '../ui/badge';
import { StarIcon } from '../ui/staricon';

const ProductCard = ({ product }: any) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <div
            key={product?.id}
            className="relative flex flex-col justify-between group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 dark:bg-muted"
        >
            <div className="flex justify-center items-center relative w-full h-[200px] bg-muted">
                {!loaded && <SkeletonCard props={{ w: '200', h: '200' }} />}
                <Image
                    onLoad={() => setLoaded(true)}
                    src={product?.coverImage?.[0]}
                    alt={'Not Found!'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="h-64 transition-all hover:opacity-70"
                    onClick={() => {
                        router.push(`/product/${product?.id}`);
                    }}
                />
            </div>
            <div className="p-4 bg-white dark:bg-muted">
                <div className="flex flex-wrap gap-3">
                    <Link
                        className="font-bold text-lg hover:animate-in hover:cursor-pointer hover:underline"
                        href={`/product/search?q=${product?.brand}`}
                    >
                        {product?.brand}
                    </Link>

                    {product?.stock === 0 && (
                        <div className="absolute top-4 left-4  px-3 py-1 rounded-full text-xs font-medium">
                            <Badge variant={'destructive'}>Out of Stock</Badge>
                        </div>
                    )}

                    <div className="flex gap-1">
                        {product?.discountPercent !== 0 && (
                            <Badge style={{ backgroundColor: '#00AFD7' }}>
                                {product?.discountPercent}% Off
                            </Badge>
                        )}

                        <Badge
                            style={{ backgroundColor: '#b47743' }}
                            className="hover:animate-in hover:cursor-pointer"
                            onClick={() => {
                                router.push(
                                    `/product/bycategories?q=${product?.categoryName}`
                                );
                            }}
                        >
                            {product?.categoryName}
                        </Badge>
                    </div>
                </div>
                <Link
                    className="text-gray-500 dark:text-gray-400 text-sm mt-2 hover:underline transition-all hover:animate-in"
                    href={`/product/${product?.id}`}
                >
                    {product?.title}
                </Link>
                <div className="flex flex-wrap justify-between items-center mt-3 gap-3">
                    <div className="flex justify-start items-center gap-3">
                        <div className="flex justify-start gap-1">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {product?.rating?.toFixed(1)}
                            </span>
                        </div>
                        <div>
                            {product?.discountPercent ? (
                                <div className="flex">
                                    <span className="text-lg font-bold mr-2">
                                        $
                                        {(
                                            ((100 - product?.discountPercent) /
                                                100) *
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
                        </div>
                    </div>

                    {product?.stock !== 0 && (
                        <AddtoCart currProduct={product} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
