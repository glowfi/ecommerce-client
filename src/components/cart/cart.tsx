'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import CartItems from './cartItems';
import { usecartStore } from './store';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const cart = usecartStore((state: any) => state.cart);
    const router = useRouter();
    const [sheetOpen, setSheetOpen] = useState(false);

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
