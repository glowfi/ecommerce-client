'use client';
import Image from 'next/image';
import React from 'react';

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

const ProductCard = ({ currProduct }: any) => {
    const router = useRouter();
    return (
        <Card className="w-[350px] cursor-pointer">
            <CardHeader>
                <div className="flex gap-3">
                    <CardTitle>{currProduct?.brand}</CardTitle>
                    <Badge variant={'default'}>{currProduct?.category}</Badge>
                </div>
                <CardDescription>{currProduct?.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <Image
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
