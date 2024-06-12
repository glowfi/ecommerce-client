'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useState } from 'react';
import Addtocart from '../product/addtocart';
import { SHIPPING_AMOUNT, TAX_AMOUNT } from './constants';
import { usecartStore } from './store';
import { SkeletonCard } from '../product/SkeletonCard';
import Image from 'next/image';
import { CardHeader, CardTitle } from '../ui/card';

export default function FinalCart() {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <>
            {cart.length === 0 ? (
                <CardHeader className="px-7">
                    <CardTitle className="text-center">Cart Empty!</CardTitle>
                </CardHeader>
            ) : (
                <div className="min-h-screen">
                    <main className="container mx-auto py-8 md:py-12">
                        <div>
                            <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-primary-foreground">
                                <h2 className="text-lg font-semibold">
                                    Cart Items
                                </h2>
                                <div className="mt-4 space-y-4">
                                    {cart.map((p: any, idx: any) => {
                                        return (
                                            <div
                                                className="flex items-center justify-between"
                                                key={idx}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {!loaded && (
                                                        <SkeletonCard
                                                            props={{
                                                                w: '100',
                                                                h: '100'
                                                            }}
                                                        />
                                                    )}

                                                    <Image
                                                        onLoad={() =>
                                                            setLoaded(true)
                                                        }
                                                        src={p?.coverImage?.[1]}
                                                        alt="Product Image"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-md"
                                                    />
                                                    <div className="flex flex-col justify-center items-start">
                                                        <Link
                                                            className="text-base font-medium underline hover:cursor-pointer"
                                                            href={`/product/${p?.id}`}
                                                        >
                                                            {p?.title}
                                                        </Link>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {p?.brand}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            x{p?.quantity}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            ${p?.price} p/c
                                                        </p>
                                                        <Addtocart
                                                            currProduct={{
                                                                ...p,
                                                                category:
                                                                    p?.category
                                                                        ?.name
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base font-semibold">
                                                        ${' '}
                                                        {p?.price * p?.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Separator className="my-6" />
                                <div className="flex items-center justify-between">
                                    <span className="text-base  font-semibold">
                                        Subtotal
                                    </span>
                                    <span className="text-base font-semibold">
                                        ${amount}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold">
                                        Shipping
                                    </span>
                                    <span className="text-base font-semibold">
                                        $5.00
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold">
                                        Tax
                                    </span>
                                    <span className="text-base font-semibold">
                                        $15.00
                                    </span>
                                </div>
                                <Separator className="my-6" />
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold">
                                        Total
                                    </span>
                                    <span className="text-lg font-semibold">
                                        ${amount + TAX_AMOUNT + SHIPPING_AMOUNT}
                                    </span>
                                </div>
                                <div className="flex justify-center items-center">
                                    <Link
                                        className="underline"
                                        href={'/checkout'}
                                    >
                                        {`Proceed to Buy (${cart.length} items)`}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </>
    );
}
