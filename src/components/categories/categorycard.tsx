'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { SkeletonCard } from '../product/SkeletonCard';

const CategoryCard = ({ allCat }: any) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <>
            {allCat?.map((p: any, idx: any) => {
                return (
                    <Card x-chunk="dashboard-01-chunk-0" key={idx}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold">
                                {p?.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!loaded && (
                                <SkeletonCard props={{ w: '200', h: '200' }} />
                            )}

                            <Image
                                src={p?.categoryImage?.[1]}
                                onLoad={() => setLoaded(true)}
                                alt="Not Found"
                                width={200}
                                height={200}
                                className="hover:opacity-75 transition-all"
                                onClick={() => {
                                    router.push(`/product/search?q=${p?.name}`);
                                }}
                            />
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
};

export default React.memo(CategoryCard);
