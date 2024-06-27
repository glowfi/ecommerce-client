'use client';
import { Copy, Truck } from 'lucide-react';

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
import { useToast } from '@/components/ui/use-toast';
import { Get_Order_By_UseridDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { getDateHumanReadable } from '@/lib/utils';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useuserStore } from '../auth/store';
import { SHIPPING_AMOUNT, TAX_AMOUNT } from '../cart/constants';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { Badge } from '../ui/badge';
import { LoadingButton } from '../ui/loading-button';
import { TOTAL_ITEMS } from './contants';
import { OrderDetailsModal } from './orderinfo';
import { Heading, RefetchButton } from './reuseComponents';
import { useuserinfo } from './store';
TimeAgo.addDefaultLocale(en);

function OrderTable({ allOrders, cidx, setIdx }: any) {
    return (
        <div>
            <Heading name="orders" />
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead className="hidden sm:table-cell">
                                Payment Status
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">
                                Orderd At
                            </TableHead>
                            <TableHead className="text-right xl:hidden">
                                Orders Details
                            </TableHead>
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
                                        <div className="font-medium hidden md:block">
                                            {p?.id}
                                        </div>
                                        <div className="font-medium md:hidden">
                                            {p?.id.slice(0, 8)}...
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {p?.hasFailed ? (
                                            <Badge variant={'destructive'}>
                                                Failed
                                            </Badge>
                                        ) : (
                                            <div className="flex gap-1">
                                                <Badge variant={'outline'}>
                                                    {' '}
                                                    {p?.paymentBy === 'razorpay'
                                                        ? 'paid'
                                                        : 'pending'}
                                                </Badge>
                                                {'/'}
                                                <Badge>{p?.paymentBy}</Badge>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <ReactTimeAgo
                                            date={p?.orderedAt}
                                            locale="en-US"
                                        />
                                    </TableCell>
                                    <TableCell className="text-right xl:hidden">
                                        <OrderDetailsModal
                                            allOrders={allOrders}
                                            idx={cidx}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export function Side({ allOrders, idx }: any) {
    const { toast } = useToast();

    return (
        <Card className="overflow-hidden max-w-full max-h-full">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Order Details
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Copy
                                className="h-3 w-3 visible"
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        allOrders[idx]?.id
                                    );

                                    toast({
                                        variant: 'default',
                                        description: `Order ID copied to clipboard !`
                                    });
                                }}
                            />
                            <span className="sr-only">Copy Order ID</span>
                        </Button>
                        {/* <div className="flex"> */}
                        {/*     {allOrders[idx]?.hasFailed ? ( */}
                        {/*         <Badge variant={'destructive'}>Failed</Badge> */}
                        {/*     ) : ( */}
                        {/*         <div className="flex gap-1"> */}
                        {/*             <Badge variant={'outline'}> */}
                        {/*                 {' '} */}
                        {/*                 {allOrders[idx]?.paymentBy === */}
                        {/*                 'razorpay' */}
                        {/*                     ? 'paid' */}
                        {/*                     : 'pending'} */}
                        {/*             </Badge> */}
                        {/*             {'/'} */}
                        {/*             <Badge>{allOrders[idx]?.paymentBy}</Badge> */}
                        {/*         </div> */}
                        {/*     )} */}
                        {/* </div> */}
                    </CardTitle>
                    <CardDescription>
                        <div className="flex flex-col justify-start gap-1">
                            <span>Order ID : #{allOrders[idx]?.id}</span>
                        </div>
                    </CardDescription>
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 mt-3 w-fit"
                    >
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Track Order
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm w-full">
                <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                        {allOrders[idx]?.productsOrdered?.map(
                            (p: any, id: any) => {
                                return (
                                    <li
                                        className="flex items-center justify-between"
                                        key={id}
                                    >
                                        <span className="text-muted-foreground">
                                            {p?.title}
                                            <span className="ml-3">
                                                x{p?.quantity}
                                            </span>
                                        </span>

                                        <div className="flex gap-1">
                                            {p?.discountPercent !== 0 && (
                                                <span className="line-through">
                                                    ${p?.price}
                                                </span>
                                            )}
                                            <span>
                                                $
                                                {(
                                                    ((100 -
                                                        p?.discountPercent) /
                                                        100) *
                                                    p?.price
                                                ).toFixed(0)}
                                            </span>
                                        </div>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>
                            <span>
                                $
                                {allOrders[idx]?.amount -
                                    TAX_AMOUNT -
                                    SHIPPING_AMOUNT}
                            </span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Shipping
                            </span>
                            <span>${SHIPPING_AMOUNT}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>${TAX_AMOUNT}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>${allOrders[idx]?.amount}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Payment By
                            </span>
                            <span className="font-semibold">
                                {allOrders[idx]?.paymentBy.toUpperCase()}
                            </span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Order Time
                            </span>

                            <span className="font-semibold">
                                {getDateHumanReadable(
                                    allOrders[idx]?.orderedAt
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                                Street Address
                            </dt>
                            <dd>{allOrders[idx]?.address?.streetAddress}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">State</dt>
                            <dd>{allOrders[idx]?.address?.state}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">City</dt>
                            <dd>{allOrders[idx]?.address?.city}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Country</dt>
                            <dd>{allOrders[idx]?.address?.country}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">ZipCode</dt>
                            <dd>{allOrders[idx]?.address?.zipCode}</dd>
                        </div>
                    </dl>
                </div>

                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Name</dt>
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
            </CardContent>
        </Card>
    );
}

const getData = async () => {
    const userId = useuserStore.getState().user.id;
    const pageIdx_order = useuserinfo.getState().pageIdx_order;
    const hasMore_order = useuserinfo.getState().hasMore_order;
    const lastIdx = useuserinfo.getState().lastIdx_order;
    const allOrders = useuserinfo.getState().allOrders;

    if (lastIdx === -1 || lastIdx !== pageIdx_order) {
        useuserinfo.setState({ lastIdx_order: pageIdx_order });
    } else if (lastIdx !== -1 && lastIdx === pageIdx_order) {
        return -1;
    }

    if (hasMore_order) {
        const data = await getClient().query(
            Get_Order_By_UseridDocument,
            {
                userId,
                skipping: pageIdx_order * TOTAL_ITEMS,
                limit: TOTAL_ITEMS
            },
            { requestPolicy: 'network-only' }
        );
        let currData = data?.data?.getOrdersByUserid?.data;

        if (currData && hasMore_order) {
            let newOrder = {};

            for (let index = 0; index < currData.length; index++) {
                let currOrder = currData[index];
                // @ts-ignore
                newOrder[`${currOrder.id}`] = { ...currOrder };
            }

            useuserinfo.setState({
                allOrders: { ...allOrders, ...newOrder }
            });

            if (currData.length < TOTAL_ITEMS) {
                useuserinfo.setState({ hasMore_order: false });
            }

            return data;
        }
    }
    return [];
};

export function Myorders() {
    const loading = useuserinfo((state: any) => state.loading);
    const setLoading = useuserinfo((state: any) => state.setLoading);
    const allOrders = useuserinfo((state: any) => state.allOrders);
    const pageIdx_order = useuserinfo((state: any) => state.pageIdx_order);
    const hasMore_order = useuserinfo((state: any) => state.hasMore_order);
    const [idx, setIdx] = useState(0);
    const flattened = Object.values(allOrders);
    const reset_order = useuserinfo((state: any) => state.reset_order);

    useEffect(() => {
        setLoading(true);
        getData()
            .then((data) => {
                //@ts-ignore
                if (data?.data?.getOrdersByUserid?.data || data === -1) {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, [pageIdx_order, allOrders]);

    if (loading) {
        return <LoadingSpinner name="user orders" />;
    } else {
        return (
            <div className="container flex gap-6 items-start justify-center">
                {flattened.length === 0 && (
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        No orders yet!
                    </h2>
                )}

                {flattened.length > 0 && (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            <OrderTable
                                allOrders={flattened}
                                cidx={idx}
                                setIdx={setIdx}
                                loading={loading}
                                setLoading={setLoading}
                            />

                            <div className="flex flex-col justify-center items-center mt-6 gap-6">
                                {!loading && hasMore_order && (
                                    <LoadingButton
                                        className="mt-6 w-fit"
                                        loading={loading}
                                        onClick={() => {
                                            useuserinfo.setState({
                                                pageIdx_order: pageIdx_order + 1
                                            });
                                        }}
                                    >
                                        Load more Orders
                                    </LoadingButton>
                                )}
                                <RefetchButton
                                    name="orders"
                                    reset_order={reset_order}
                                />
                            </div>
                        </div>

                        <div className="hidden xl:block w-full">
                            <Side allOrders={flattened} idx={idx} />
                        </div>
                    </>
                )}
            </div>
        );
    }
}
