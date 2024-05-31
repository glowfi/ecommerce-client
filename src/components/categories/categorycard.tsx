'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CategoryCard = ({ allCat }: any) => {
    const router = useRouter();

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
                            <Image
                                src={p?.categoryImage?.[1]}
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
