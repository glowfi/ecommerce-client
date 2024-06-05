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

const ProductDetails = ({ currProduct }: any) => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        {currProduct?.brand}
                    </CardTitle>
                    <CardDescription>{currProduct?.title}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <AddtoCart currProduct={currProduct} />
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Product Details</div>
                    <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Rating</span>
                        <span>{currProduct?.rating}/5</span>
                    </li>
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
                            <dt className="text-muted-foreground">Seller</dt>
                            <dd>{currProduct?.seller?.sellerName}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">
                                    {currProduct?.seller?.email}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                                <a href="tel:">
                                    {currProduct?.seller?.phone_number}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Sold By</dt>
                            <dd>{currProduct?.seller?.companyName}</dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                        <div className="font-semibold">
                            Seller Company Information
                        </div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                            <span>
                                {
                                    currProduct?.seller?.companyAddress
                                        ?.streetAddress
                                }
                            </span>
                            <span>
                                {currProduct?.seller?.companyAddress?.state}
                            </span>
                            <span>
                                {currProduct?.seller?.companyAddress?.city}
                            </span>
                            <span>
                                {currProduct?.seller?.companyAddress?.zipCode}
                            </span>
                        </address>
                    </div>
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
