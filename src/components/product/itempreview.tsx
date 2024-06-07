'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { SkeletonCard } from './SkeletonCard';

const ItemPrev = ({ currProduct }: any) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    return (
        <>
            {!loaded && <SkeletonCard props={{ w: '500', h: '500' }} />}
            {currProduct?.coverImage?.length > 0 && (
                <Image
                    onLoad={() => setLoaded(true)}
                    src={currProduct?.coverImage?.[1]}
                    alt="Not Found"
                    width={500}
                    height={500}
                    className="gap-6"
                />
            )}
        </>
    );
};

export default React.memo(ItemPrev);
