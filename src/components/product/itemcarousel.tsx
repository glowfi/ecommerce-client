'use client';
import React, { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';
import { userefStore } from './store';
import { Skeleton } from '../ui/skeleton';

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[150px] w-[150px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

const Itemcarousel = ({ currProduct }: any) => {
    const currButtonRef = userefStore((state: any) => state.eventRef);
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Carousel className="w-full max-w-sm sm:max-w-xl">
            <CarouselContent className="-ml-1">
                {currProduct?.images?.map((p: any, index: number) => (
                    <CarouselItem
                        key={index}
                        className="pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {!loaded && <SkeletonCard />}

                                    <Image
                                        src={p?.[1]}
                                        alt="Not Found"
                                        width={150}
                                        height={150}
                                        onClick={() => {
                                            currButtonRef.current.click();
                                            userefStore.setState({
                                                currImage: p?.[1]
                                            });
                                        }}
                                        className="hover:opacity-75 transition-all"
                                        onLoad={() => setLoaded(true)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default React.memo(Itemcarousel);
