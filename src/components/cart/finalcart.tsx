'use client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { usecartStore } from './store';
import Image from 'next/image';
import Addtocart from '../product/addtocart';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const FinalCart = () => {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const router = useRouter();

    return (
        <div className="container mt-6">
            <Card>
                {cart.length === 0 ? (
                    <CardHeader className="px-7">
                        <CardTitle className="text-center">
                            Cart Empty!
                        </CardTitle>
                    </CardHeader>
                ) : (
                    <>
                        <CardHeader className="px-7">
                            <CardTitle className="text-center">
                                Your Cart
                            </CardTitle>
                            <CardDescription className="text-center">
                                Your order from our store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Quantity
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Cost per/piece
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.map((p: any, idx: any) => {
                                        return (
                                            <TableRow key={idx}>
                                                <TableCell>
                                                    <div className="flex flex-col gap-6 justify-center items-start">
                                                        <div className="font-medium">
                                                            {p?.title}
                                                        </div>
                                                        <Image
                                                            src={
                                                                p
                                                                    ?.coverImage?.[1]
                                                            }
                                                            width={100}
                                                            height={100}
                                                            alt="Not Found"
                                                            className="rounded-md"
                                                        />
                                                        <Addtocart
                                                            currProduct={{
                                                                ...p,
                                                                category:
                                                                    p?.category
                                                                        ?.name
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge
                                                        className="text-xs"
                                                        variant="default"
                                                    >
                                                        x{p?.quantity}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Badge
                                                        className="text-xs"
                                                        variant="default"
                                                    >
                                                        ${p?.price}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Badge
                                                        className="text-xs"
                                                        variant="default"
                                                    >
                                                        $
                                                        {p?.price * p?.quantity}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div className="flex justify-center items-center gap-4 m-4">
                                <span>Amount to be paid :</span>
                                <div className="ml-auto font-semibold">
                                    <Badge
                                        className="text-xs"
                                        variant="default"
                                    >
                                        ${amount}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <Button
                                    type="button"
                                    className="underline"
                                    variant={'link'}
                                    onClick={() => {
                                        router.push('/checkout');
                                    }}
                                >
                                    {`Proceed to Buy (${cart.length} items)`}
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
};

export default FinalCart;
