'use client';

import { Skeleton } from '../ui/skeleton';

export function SkeletonCard({ props: { w, h } }: any) {
    return (
        <div className="flex flex-col space-y-3 overflow-hidden">
            <Skeleton className={`h-[125px] w-[${w}px] rounded-xl`} />
            <div className="space-y-2">
                <Skeleton
                    // @ts-ignore
                    className={`h-4 w-[${parseInt(parseInt(w) / 2).toString()}px]`}
                />
                <Skeleton
                    // @ts-ignore
                    className={`h-4 w-[${parseInt(parseInt(w) / 2).toString()}px]`}
                />
            </div>
        </div>
    );
}
