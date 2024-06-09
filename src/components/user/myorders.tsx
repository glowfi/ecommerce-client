'use client';
import { Copy, CreditCard, Truck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Get_Order_By_UseridDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { getDateHumanReadable } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useuserStore } from '../auth/store';
import { LoadingButton } from '../ui/loading-button';
import { TOTAL_ITEMS } from './contants';
import { useuserinfo } from './store';

function OrderTable({ allOrders, cidx, setIdx }) {
    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    Your recent orders from our store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Payment By
                            </TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Status
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                                Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allOrders.map((p: any, idx: number) => {
                            return (
                                <TableRow
                                    key={idx}
                                    className={
                                        idx == cidx
                                            ? 'bg-muted hover:cursor-pointer'
                                            : 'hover:cursor-pointer'
                                    }
                                    onClick={() => setIdx(idx)}
                                >
                                    <TableCell>
                                        <div className="font-medium">
                                            {p?.id}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {p?.paymentBy}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {p?.isPending
                                            ? 'Pending'
                                            : 'Order Placed'}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        {getDateHumanReadable(p?.orderedAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ${p?.amount}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function Side({ allOrders, idx }) {
    const user = useuserStore((state: any) => state.user);
    return (
        <Card className="overflow-hidden max-w-fit max-h-fit">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        #{allOrders[idx]?.id}
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Order ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Date: {getDateHumanReadable(allOrders[idx]?.orderedAt)}
                    </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Track Order
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                        {allOrders[idx]?.productsOrdered?.map((p: any) => {
                            return (
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {p?.title} x <span>{p?.quantity}</span>
                                    </span>
                                    <span>${p?.price}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>
                            <span>${allOrders[idx]?.amount}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Shipping
                            </span>
                            <span>$5.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>$25.00</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>${allOrders[idx]?.amount}</span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd>{allOrders[idx]?.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                                Street Address
                            </dt>
                            <dd>
                                <a href="mailto:">
                                    {allOrders[idx]?.address?.streetAddress}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">State</dt>
                            <dd>
                                <a href="tel:">
                                    {allOrders[idx]?.address?.state}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">City</dt>
                            <dd>
                                <a href="tel:">
                                    {allOrders[idx]?.address?.city}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Country</dt>
                            <dd>
                                <a href="tel:">
                                    {allOrders[idx]?.address?.country}
                                </a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">ZipCode</dt>
                            <dd>
                                <a href="tel:">
                                    {allOrders[idx]?.address?.zipCode}
                                </a>
                            </dd>
                        </div>
                    </dl>
                </div>

                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Customer</dt>
                            <dd>{allOrders[idx]?.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">{allOrders[idx]?.email}</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                                <a href="tel:">{allOrders[idx]?.phoneNumber}</a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center gap-1 text-muted-foreground">
                                <CreditCard className="h-4 w-4" />
                                Visa
                            </dt>
                            <dd>**** **** **** 4532</dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
        </Card>
    );
}

export function Myorders() {
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);

    // const loading = useuserinfo((state: any) => state.loading);
    const allOrders = useuserinfo((state: any) => state.allOrders);
    const pageIdx_order = useuserinfo((state: any) => state.pageIdx_order);
    const hasMore_order = useuserinfo((state: any) => state.hasMore_order);
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const getData = async () => {
            console.log('Enterd');
            const userId = useuserStore.getState().user.id;
            const pageIdx_order = useuserinfo.getState().pageIdx_order;
            const hasMore_order = useuserinfo.getState().hasMore_order;
            const lastIdx = useuserinfo.getState().lastIdx_order;
            const allOrders = useuserinfo.getState().allOrders;

            if (lastIdx === -1 || lastIdx !== pageIdx_order) {
                useuserinfo.setState({ lastIdx_order: pageIdx_order });
            } else if (lastIdx !== -1 && lastIdx === pageIdx_order) {
                // setLoading(false);
                // useuserinfo.setState({ loading: false });
                return -1;
            }

            if (hasMore_order) {
                // useuserinfo.setState({ loading: true });
                const data = await getClient().query(
                    Get_Order_By_UseridDocument,
                    {
                        userId,
                        skipping: pageIdx_order * TOTAL_ITEMS,
                        limit: TOTAL_ITEMS
                    }
                );
                let currData = data?.data?.getOrdersByUserid?.data;

                if (currData) {
                    useuserinfo.setState({
                        allOrders: [...allOrders, ...currData]
                    });
                    if (currData.length < TOTAL_ITEMS) {
                        useuserinfo.setState({ hasMore_order: false });
                    }

                    return data;
                    // setLoading(false);

                    // useuserinfo.setState({ loading: false });
                } else {
                    // setLoading(false);
                    // useuserinfo.setState({ loading: false });
                }
            }
        };

        setFetching(true);
        getData()
            .then((data) => {
                console.log('Resolved');
                if (data?.data?.getOrdersByUserid?.data || data === -1) {
                    setFetching(false);
                    setLoading(false);
                } else {
                    setFetching(false);
                    setLoading(false);
                }
            })
            .catch(() => {
                setFetching(false);
                setLoading(false);
            });
    }, [pageIdx_order]);

    if (loading) {
        console.log('Enter loading state');
        return <h1>Loading user orders ...</h1>;
    }

    return (
        <div className="container flex gap-6 items-start justify-center">
            <div className="flex flex-col">
                <OrderTable allOrders={allOrders} cidx={idx} setIdx={setIdx} />
                {hasMore_order && (
                    <LoadingButton
                        className="mt-6 w-fit"
                        loading={loading}
                        onClick={() => {
                            console.log('clicked');
                            useuserinfo.setState({
                                pageIdx_order: pageIdx_order + 1
                            });

                            // useuserinfo.setState({ loading: true });
                            // setLoading(true);
                        }}
                    >
                        Load more Orders
                    </LoadingButton>
                )}
            </div>
            <div className="hidden xl:block">
                <Side allOrders={allOrders} idx={idx} />
            </div>
        </div>
    );
}
