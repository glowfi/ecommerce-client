'use client';
import React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const ProductCard = ({ imageLink, name, title, category, price, id }: any) => {
    const router = useRouter();
    return (
        <Card className="w-[350px] cursor-pointer">
            <CardHeader>
                <div className="flex gap-3">
                    <CardTitle>{name}</CardTitle>
                    <Badge variant={'default'}>{category}</Badge>
                </div>
                <CardDescription>{title}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                <Image
                    src={imageLink}
                    width={250}
                    height={250}
                    alt={'Not Found'}
                    className="hover:opacity-75 transition-all"
                    onClick={() => {
                        router.push(`/product/${id}`);
                    }}
                />
            </CardContent>
            <CardFooter className="flex justify-around items-center">
                <h1 className="text-lg md:text-xl font-semibold">
                    ${parseFloat(price).toFixed(2)}
                </h1>
                <Button variant={'secondary'}>Add to Cart</Button>
            </CardFooter>
        </Card>
    );
};

export default React.memo(ProductCard);
