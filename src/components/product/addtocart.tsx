'use client';
import { Product_StockDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { Minus, Plus } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { usecartStore } from '../cart/store';
import { Button } from '../ui/button';
import { LoadingButton } from '../ui/loading-button';
import { useToast } from '@/components/ui/use-toast';

const AddtoCart = ({ currProduct }: any) => {
    const [qty, setQty] = useState(0);
    const [idx, setIdx] = useState(0);
    const cart = usecartStore((state: any) => state.cart);
    const increaseCart = usecartStore((state: any) => state.increaseCart);
    const decreaseCart = usecartStore((state: any) => state.decreaseCart);
    const { toast } = useToast();
    const [isbuttonloading, setIsbuttonloading] = useState(false);

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
                        onClick={async () => {
                            decreaseCart(currProduct.id, currProduct);
                            setQty(cart[idx]['quantity']);
                        }}
                    >
                        <Minus />
                    </Button>
                    <span>{qty}</span>
                    <LoadingButton
                        loading={isbuttonloading}
                        size={'sm'}
                        variant={'ghost'}
                        onClick={async () => {
                            setIsbuttonloading(true);

                            const data = await getClient().query(
                                Product_StockDocument,
                                {
                                    productId: currProduct.id,
                                    quantity: cart[idx]['quantity'] + 1
                                }
                            );
                            
                            if (data?.data?.checkStockByProductId) {
                                increaseCart(currProduct.id, currProduct);
                                setQty((curr) => cart[idx]['quantity']);
                            } else {
                                
                                toast({
                                    variant: 'destructive',
                                    title: 'Very Limited Stock for this product!'
                                });
                            }
                            setIsbuttonloading(false);
                        }}
                    >
                        <Plus />
                    </LoadingButton>
                </div>
            ) : (
                <LoadingButton
                    loading={isbuttonloading}
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1"
                    onClick={async () => {
                        setIsbuttonloading(true);

                        const data = await getClient().query(
                            Product_StockDocument,
                            {
                                productId: currProduct.id,
                                quantity: 1
                            }
                        );

                        if (data?.data?.checkStockByProductId) {
                            
                            increaseCart(currProduct?.id, currProduct);
                        } else {
                            toast({
                                variant: 'destructive',
                                title: 'Very Limited Stock for this product!'
                            });
                        }

                        setIsbuttonloading(false);
                    }}
                >
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                        Add to Cart
                    </span>
                </LoadingButton>
            )}
        </>
    );
};

export default React.memo(AddtoCart);
