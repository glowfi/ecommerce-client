'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SkeletonCard } from '../product/SkeletonCard';
import AddtoCart from '../product/addtocart';
import { CardContent, CardFooter } from '../ui/card';
import { usecartStore } from './store';

const CartItems = () => {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const removeCart = usecartStore((state: any) => state.removeCart);
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <div className="w-full">
            <div className="grid gap-4 py-4">
                <CardContent className="grid gap-8">
                    {cart.slice(0, 3).map((p: any, idx: any) => {
                        return (
                            <div className="flex items-center gap-4" key={idx}>
                                {!loaded && (
                                    <SkeletonCard
                                        props={{
                                            w: '100',
                                            h: '100'
                                        }}
                                    />
                                )}

                                <Image
                                    onLoad={() => setLoaded(true)}
                                    src={p?.coverImage[0]}
                                    alt="Not Found"
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        <Link
                                            href={`/product/${p?.id}`}
                                            className="underline hover:opacity-75 transition-all"
                                        >
                                            {p?.title}
                                        </Link>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Quantity : x{p?.quantity}
                                    </p>

                                    <div className="flex flex-col">
                                        <Button
                                            variant={'destructive'}
                                            onClick={() => {
                                                removeCart(p?.id);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                        <AddtoCart currProduct={p} />
                                    </div>
                                </div>
                                <div className="ml-auto font-medium">
                                    ${p?.price}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center gap-4">
                        <span>Amount to be paid :</span>
                        <div className="ml-auto font-medium">${amount}</div>
                    </div>
                </CardContent>
                <CardFooter>
                    {cart.length >= 3 && (
                        <div className="flex flex-col items-start justify-start">
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                More {cart.length - 3} items ....
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                Go to Final cart to checkout
                            </p>
                        </div>
                    )}
                </CardFooter>
            </div>
        </div>
    );
};

export default CartItems;
