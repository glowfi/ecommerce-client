'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import AddtoCart from '../product/addtocart';
import { CardContent } from '../ui/card';
import { usecartStore } from './store';

const CartItems = () => {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const removeCart = usecartStore((state: any) => state.removeCart);
    console.log(cart);

    return (
        <div className="grid gap-4 py-4">
            <CardContent className="grid gap-8">
                {cart.map((p: any, idx: any) => {
                    return (
                        <div className="flex items-center gap-4" key={idx}>
                            <Image
                                src={p?.coverImage[0]}
                                alt="Not Found"
                                width={100}
                                height={100}
                                layout="responsive"
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

                                {/* <div className="flex"> */}
                                {/*     <Button variant={'ghost'} size={'sm'}> */}
                                {/*         <Minus */}
                                {/*             onClick={() => { */}
                                {/*                 decreaseCart(p?.id, ''); */}
                                {/*             }} */}
                                {/*         /> */}
                                {/*     </Button> */}
                                {/*     <Button */}
                                {/*         variant={'ghost'} */}
                                {/*         size={'sm'} */}
                                {/*         onClick={() => { */}
                                {/*             increaseCart(p?.id); */}
                                {/*         }} */}
                                {/*     > */}
                                {/*         <Plus /> */}
                                {/*     </Button> */}
                                {/* </div> */}
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
        </div>
    );
};

export default CartItems;
