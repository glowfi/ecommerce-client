'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import AddtoCart from '../product/addtocart';
import { SkeletonCard } from '../product/SkeletonCard';

const ProductCard = ({ currProduct }: any) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Card className="w-[350px] cursor-pointer">
            <CardHeader>
                <div className="flex gap-3">
                    <CardTitle>{currProduct?.brand}</CardTitle>
                    <Badge variant={'default'}>
                        {currProduct?.categoryName}
                    </Badge>
                </div>
                <CardDescription>{currProduct?.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                {!loaded && <SkeletonCard props={{ w: '250', h: '250' }} />}

                <Image
                    onLoad={() => setLoaded(true)}
                    src={currProduct?.coverImage?.[0]}
                    width={250}
                    height={250}
                    alt={'Not Found'}
                    className="hover:opacity-75 transition-all"
                    onClick={() => {
                        router.push(`/product/${currProduct?.id}`);
                    }}
                />
            </CardContent>
            <CardFooter className="flex justify-around items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                    ${parseFloat(currProduct?.price).toFixed(2)}
                </h1>
                <AddtoCart currProduct={currProduct} />
            </CardFooter>
        </Card>
    );
};

export default React.memo(ProductCard);
