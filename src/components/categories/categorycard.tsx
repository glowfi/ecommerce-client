'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SkeletonCard } from '../product/SkeletonCard';

const CategoryCard = ({ categories }: any) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <>
            {categories.map((category: any) => (
                <Link
                    key={category.id}
                    href={`/product/bycategories?q=${category?.name}`}
                    className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                >
                    {!loaded && <SkeletonCard props={{ w: '300', h: '300' }} />}
                    <Image
                        src={category?.categoryImage?.[1]}
                        onLoad={() => setLoaded(true)}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-64"
                    />
                    <div className="absolute inset-0 bg-black/70 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                        <h3 className="text-white font-semibold text-lg">
                            {category.name}
                        </h3>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default React.memo(CategoryCard);
