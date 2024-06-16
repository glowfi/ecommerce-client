'use client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SkeletonCard } from '../product/SkeletonCard';
import AddtoCart from '../product/addtocart';
import { usecartStore } from './store';
import { useRouter } from 'next/navigation';
import { SHIPPING_AMOUNT, TAX_AMOUNT } from './constants';

const CartItems = ({ setSheetOpen }: any) => {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const removeCart = usecartStore((state: any) => state.removeCart);
    const [loaded, setLoaded] = useState<boolean>(false);
    const router = useRouter();

    return (
        <ScrollArea className="h-[95vh] w-full">
            <div className="w-full">
                <div className="grid gap-4 py-4">
                    {cart.map((p: any, idx: any) => {
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
                                    className="rounded-md w-fit"
                                />
                                <div className="flex flex-col gap-1">
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
                                    <p className="block md:hidden text-sm text-muted-foreground">
                                        Price p/c : ${(p?.price).toFixed(2)}
                                    </p>

                                    <p className="block md:hidden text-sm text-muted-foreground">
                                        Price : $
                                        {(p?.price * p?.quantity).toFixed(2)}
                                    </p>

                                    <div className="flex flex-col">
                                        <div className="flex flex-col">
                                            <Button
                                                variant={'destructive'}
                                                onClick={() => {
                                                    removeCart(p?.id);
                                                }}
                                                className="hidden md:block"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <div className="flex ml-0">
                                            <AddtoCart currProduct={p} />
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex-col items-center justify-center font-medium ml-auto">
                                    $
                                    {(
                                        ((100 - p?.discountPercent) / 100) *
                                        p?.price *
                                        p?.quantity
                                    ).toFixed(0)}
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex items-center gap-4">
                        <span>Amount to be paid :</span>
                        <div className="ml-auto font-medium">
                            $
                            {(amount + TAX_AMOUNT + SHIPPING_AMOUNT).toFixed(2)}
                        </div>
                    </div>
                    <Button
                        className="rounded-md"
                        type="button"
                        onClick={() => {
                            setSheetOpen(false);
                            router.push('/checkout');
                        }}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </ScrollArea>
    );
};

export default CartItems;
