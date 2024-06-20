'use client';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartItems from './cartItems';
import { usecartStore } from './store';

const setCart = () => {
    if (
        usecartStore.getState().cart.length === 0 &&
        !usecartStore.getState().isinitialized
    ) {
        
        usecartStore.setState({ cart: [] });
        usecartStore.setState({ isinitialized: true });
    }
};

const Cart = () => {
    const cart = usecartStore((state: any) => state.cart);
    const router = useRouter();
    const [sheetOpen, setSheetOpen] = useState(false);

    useEffect(() => {
        setCart();
    }, []);

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <ShoppingCart />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {cart.length == 0 ? (
                    <div className="flex justify-center items-center">
                        <h1>Cart Empty!</h1>
                    </div>
                ) : (
                    <>
                        <CartItems setSheetOpen={setSheetOpen} />
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default React.memo(Cart);
