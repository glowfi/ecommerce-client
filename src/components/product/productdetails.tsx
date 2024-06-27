'use client';
import { Separator } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card';
import AddtoCart from './addtocart';
import { Badge } from '../ui/badge';

const ProductDetails = ({ currProduct }: any) => {
    return (
        <Card className="overflow-hidden w-fit">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col items-start gap-0.5 justify-center">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            {currProduct?.brand}
                        </CardTitle>
                        <CardDescription className="text-wrap">
                            {currProduct?.title}
                        </CardDescription>
                    </div>
                    <div className="ml-auto">
                        {currProduct?.stock === 0 ? (
                            <Badge
                                className="w-fit text-center"
                                variant={'destructive'}
                            >
                                Out of Stock
                            </Badge>
                        ) : (
                            <AddtoCart currProduct={currProduct} />
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Product Details</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Price</span>
                            <span>${currProduct?.price}</span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3 mt-3">
                    <div className="font-semibold">Description</div>
                    <span>{currProduct?.description}</span>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Seller Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Seller
                            </dt>
                            <dd>{currProduct?.seller?.sellerName}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Email
                            </dt>
                            <dd>
                                <a href="mailto:">
                                    {currProduct?.seller?.email}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Phone
                            </dt>
                            <dd>
                                <a href="tel:">
                                    {currProduct?.seller?.phoneNumber}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Sold By
                            </dt>
                            <dd>{currProduct?.seller?.companyName}</dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Seller Company address</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Address
                            </dt>
                            <dd>
                                {
                                    currProduct?.seller?.companyAddress
                                        ?.streetAddress
                                }
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                City
                            </dt>
                            <dd>{currProduct?.seller?.companyAddress?.city}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                State
                            </dt>
                            <dd>
                                {currProduct?.seller?.companyAddress?.state}
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                Country
                            </dt>
                            <dd>
                                {currProduct?.seller?.companyAddress?.country}
                            </dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt className="hidden md:block text-muted-foreground">
                                ZipCode
                            </dt>
                            <dd>
                                {currProduct?.seller?.companyAddress?.zipCode}
                            </dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Product Created{' '}
                    <time> {currProduct?.dateCreatedHuman}</time>
                </div>
            </CardFooter>
        </Card>
    );
};

export default React.memo(ProductDetails);
