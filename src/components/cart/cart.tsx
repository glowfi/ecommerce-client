'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import CartItems from './cartItems';
import { usecartStore } from './store';

const Cart = () => {
    const cart = usecartStore((state: any) => state.cart);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ShoppingCart />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length == 0 ? (
                    <div className="flex justify-center items-center">
                        <h1>Cart Empty!</h1>
                    </div>
                ) : (
                    <>
                        <CartItems />
                        <SheetFooter>
                            <Button type="submit">Checkout</Button>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default React.memo(Cart);
