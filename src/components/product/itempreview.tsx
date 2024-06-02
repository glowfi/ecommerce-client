import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import React, { useState } from 'react';

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[700px] w-[500px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

const ItemPrev = ({ currProduct }: any) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    return (
        <>
            {!loaded && <SkeletonCard />}
            <Image
                src={currProduct?.coverImage?.[1]}
                alt="Not Found"
                width={500}
                height={700}
                className="gap-6"
                onLoad={() => setLoaded(true)}
            />
        </>
    );
};

export default React.memo(ItemPrev);
