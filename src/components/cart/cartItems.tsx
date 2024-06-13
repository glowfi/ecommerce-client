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
        <ScrollArea className="h-[95vh] w-full  rounded-md p-4">
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
                        <div className="ml-auto font-medium">
                            $
                            {(amount + TAX_AMOUNT + SHIPPING_AMOUNT).toFixed(2)}
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                            setSheetOpen(false);
                            router.push('/cart');
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
