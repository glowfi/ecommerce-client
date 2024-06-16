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
import { SkeletonCard } from './SkeletonCard';

const Itemcarousel = ({ currProduct }: any) => {
    const currButtonRef = userefStore((state: any) => state.eventRef);
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Carousel className="w-min md:w-full">
            <CarouselContent className="-ml-1">
                {currProduct?.images?.map((p: any, index: number) => (
                    <CarouselItem
                        key={index}
                        className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex  items-center justify-center p-6">
                                    {!loaded && (
                                        <SkeletonCard
                                            props={{ w: '200', h: '200' }}
                                        />
                                    )}

                                    {p?.length > 0 && (
                                        <Image
                                            onLoad={() => setLoaded(true)}
                                            src={p?.[1]}
                                            alt="Not Found"
                                            width={200}
                                            height={200}
                                            onClick={() => {
                                                currButtonRef.current.click();
                                                userefStore.setState({
                                                    currImage: p?.[1]
                                                });
                                            }}
                                            className="hover:opacity-75 transition-all"
                                        />
                                    )}
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
