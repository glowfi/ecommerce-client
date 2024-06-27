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
    const router = useRouter();
    const [isloading, setIsloading] = useState(true);

    return (
        <ScrollArea className="h-[95vh] w-full">
            <div className="flex flex-col justify-center items-start gap-4 p-3 w-full sm:w-fit">
                {cart.map((p: any, idx: any) => {
                    return (
                        <div
                            className="flex justify-start items-center gap-4 mr-3"
                            key={idx}
                        >
                            {isloading && (
                                <SkeletonCard
                                    props={{
                                        w: '100',
                                        h: '100'
                                    }}
                                />
                            )}

                            <Image
                                src={p?.coverImage[0]}
                                alt="Not Found"
                                width={100}
                                height={100}
                                className={`
              duration-700 ease-in-out group-hover:opacity-75 rounded-md w-fit
              ${
                  isloading
                      ? 'scale-100 blur-xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
              })`}
                                onLoadingComplete={() => setIsloading(false)}
                            />
                            <div className="flex  flex-col justify-start gap-1 w-full">
                                <p className="text-sm font-medium leading-none">
                                    <Link
                                        href={`/product/${p?.id}`}
                                        className="hover:underline transition-all font-bold"
                                    >
                                        {p?.title}
                                    </Link>
                                </p>
                                <p className="text-sm text-muted-foreground font-bold">
                                    Quantity : x{p?.quantity}
                                </p>
                                {/* <p className="flex text-sm text-muted-foreground"> */}
                                {/*     Price p/c : ${(p?.price).toFixed(2)} */}
                                {/* </p> */}

                                <p className="flex text-sm text-muted-foreground font-bold">
                                    Price : $
                                    {(
                                        ((100 - p?.discountPercent) / 100) *
                                        p?.price *
                                        p?.quantity
                                    ).toFixed(0)}
                                </p>

                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <Button
                                            variant={'destructive'}
                                            size={'sm'}
                                            onClick={() => {
                                                removeCart(p?.id);
                                            }}
                                            className="hidden sm:block"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <div className="flex mt-3">
                                        <AddtoCart currProduct={p} />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center justify-end ml-auto font-bold w-full">
                                $
                                {(
                                    ((100 - p?.discountPercent) / 100) *
                                    (p?.price * p?.quantity)
                                ).toFixed(0)}
                            </div>
                        </div>
                    );
                })}

                <div className="flex items-start justify-around sm:justify-between gap-3 w-fit sm:w-full">
                    <div className="flex flex-col justify-start items-center gap-1 w-full">
                        <span>Amount to be paid :</span>
                        <small className="font-semibold text-wrap text-center">
                            (Inclusive of shipping fee and tax)
                        </small>
                    </div>
                    <span className="font-bold">
                        ${(amount + SHIPPING_AMOUNT + TAX_AMOUNT).toFixed(0)}
                    </span>
                </div>
                <Button
                    className="rounded-md w-full"
                    type="button"
                    onClick={() => {
                        setSheetOpen(false);
                        router.push('/checkout');
                    }}
                >
                    Checkout
                </Button>
            </div>
        </ScrollArea>
    );
};

export default CartItems;
