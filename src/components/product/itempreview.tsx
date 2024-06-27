'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { SkeletonCard } from './SkeletonCard';

const ItemPrev = ({ currProduct }: any) => {
    const [isloading, setIsloading] = useState(true);

    return (
        <div className="hidden md:flex justify-center items-center">
            {isloading && (
                <div className="flex justify-center items-center">
                    <SkeletonCard props={{ w: '500', h: '500' }} />
                </div>
            )}
            {currProduct?.coverImage?.length > 0 && (
                <Image
                    onLoadingComplete={() => setIsloading(false)}
                    src={currProduct?.coverImage?.[1]}
                    alt="Not Found"
                    width={500}
                    height={500}
                    className={`
              duration-700 ease-in-out group-hover:opacity-75 rounded-md gap-6
              ${
                  isloading
                      ? 'scale-100 blur-xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
              })`}
                />
            )}
        </div>
    );
};

export default React.memo(ItemPrev);
