'use client';
import { BaggageClaim, Minus, Plus } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { usecartStore } from '../cart/store';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const AddtoCart = ({ currProduct }: any) => {
    const [qty, setQty] = useState(0);
    const [idx, setIdx] = useState(0);
    const cart = usecartStore((state: any) => state.cart);
    const increaseCart = usecartStore((state: any) => state.increaseCart);
    const decreaseCart = usecartStore((state: any) => state.decreaseCart);
    const { toast } = useToast();

    const isPresent = useCallback(() => {
        return cart.filter((p: any) => p.id == currProduct.id)[0];
    }, [cart, currProduct.id]);

    useEffect(() => {
        if (isPresent()) {
            for (let index = 0; index < cart.length; index++) {
                if (cart[index]['id'] == currProduct?.id) {
                    setQty(cart[index]['quantity']);
                    setIdx(index);
                }
            }
        }
    }, [cart, qty, isPresent, currProduct.id]);

    return (
        <>
            {isPresent() ? (
                <div className="flex justify-evenly items-center gap-3">
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        onClick={() => {
                            decreaseCart(currProduct.id, currProduct);
                            setQty(cart[idx]['quantity']);
                        }}
                    >
                        <Minus />
                    </Button>
                    <span>{qty}</span>
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        onClick={() => {
                            let res = increaseCart(currProduct.id, currProduct);
                            if (res) {
                                toast({
                                    variant: 'destructive',
                                    title: 'OVER PRODUCT STOCK LIMIT!',
                                    description:
                                        'Only Few items left for this Product.'
                                });
                            }
                            setQty((curr) => cart[idx]['quantity']);
                        }}
                    >
                        <Plus />
                    </Button>
                </div>
            ) : (
                <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    onClick={() => {
                        let res = increaseCart(currProduct?.id, currProduct);
                    }}
                >
                    <BaggageClaim className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Add to Cart
                    </span>
                </Button>
            )}
        </>
    );
};

export default React.memo(AddtoCart);
