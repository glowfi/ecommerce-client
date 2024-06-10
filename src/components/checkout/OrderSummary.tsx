'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card';
import { usecartStore } from '../cart/store';
import Image from 'next/image';
import React, { useState } from 'react';
import { usecheckoutStore } from './store';
import { useuserStore } from '../auth/store';
import { useMutation } from '@urql/next';
import { CreateorderDocument } from '@/gql/graphql';
import RazorPayModal from './RazorPayModal';
import { LoadingButton } from '../ui/loading-button';
import { useRouter } from 'next/navigation';

import { SkeletonCard } from '../product/SkeletonCard';

const OrderSummary = ({ handlePrevious, handleSubmit }: any) => {
    const cart = usecartStore((state: any) => state.cart);
    const amount = usecartStore((state: any) => state.amount);
    const contact = usecheckoutStore((state: any) => state.contact);
    const payment = usecheckoutStore((state: any) => state.payment);
    const user = useuserStore((state: any) => state.user);
    const [, execCreateOrder] = useMutation(CreateorderDocument);
    const [loading, setLoading] = React.useState(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const router = useRouter();

    const [order_id_razor, setOrder_id_razor] = useState('');
    const [order_id, setOrder_id] = useState('');

    let productsOrdered = [];
    for (let index = 0; index < cart.length; index++) {
        let currProd = cart[index];
        productsOrdered.push([currProd.id, currProd.quantity.toString()]);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Cart Items</h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {cart?.length} items
                        </div>
                    </div>
                    <div className="grid gap-2">
                        {cart.map((p: any, idx: any) => {
                            return (
                                <div
                                    className="flex items-center justify-between"
                                    key={idx}
                                >
                                    <div className="flex items-center gap-2">
                                        {!loaded && (
                                            <SkeletonCard
                                                props={{ w: '48', h: '48' }}
                                            />
                                        )}

                                        <Image
                                            onLoad={() => setLoaded(true)}
                                            src={p?.coverImage[0]}
                                            width="48"
                                            height="48"
                                            alt="Not Found"
                                            className="rounded-md"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                {p?.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                ${p?.price} x {p?.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium">
                                        ${p?.price * p?.quantity}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
                                Shipping Details
                            </h4>
                        </div>
                        <div className="flex flex-col">
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b> Name</b> : {contact.name}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>Email</b> : {contact.email}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>Phone</b> : {contact.phone_number}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>Street Address</b> :{' '}
                                {contact.address.street_address}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>Country</b> : {contact.address.country}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>State</b> : {contact.address.state}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>City</b> : {contact.address.city}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>ZipCode</b> : {contact.address.zipCode}
                            </p>
                            <p className="leading-7 [&:not(:first-child)]:mt-0">
                                <b>Payment Mode</b> : {payment.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Total</h3>
                    <div className="text-2xl font-bold">${amount}</div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={handlePrevious}>
                    Previous
                </Button>
                <LoadingButton
                    loading={loading}
                    onClick={async () => {
                        setLoading(true);

                        let newContact = { ...contact };
                        let currVal = newContact.address.street_address;
                        let currVal1 = newContact.phone_number;

                        delete newContact.address.street_address;
                        delete newContact.address.phoneNumber;

                        newContact['address']['streetAddress'] = currVal;
                        newContact['phoneNumber'] = currVal1;

                        let savedEmail = newContact.email;
                        let savedName = newContact.name;
                        let savedChecked = newContact.update_address;

                        let currVal2 = newContact.countryCode;
                        delete newContact.countryCode;
                        newContact['address']['countryCode'] = currVal2;
                        delete newContact.phone_number;
                        delete newContact.email;
                        delete newContact.name;
                        delete newContact.update_address;

                        let data = await execCreateOrder({
                            data: {
                                paymentBy: payment,
                                amount: parseInt(parseFloat(amount).toFixed(2)),
                                productsOrdered,
                                userID: user.id,
                                userDetails: {
                                    ...newContact
                                },
                                name: savedName,
                                email: savedEmail,
                                phoneNumber: newContact.phoneNumber,
                                address: newContact.address,
                                updateAddress: savedChecked ? true : false
                            }
                        });

                        let get_oder_id = data?.data?.createOrder;

                        if (get_oder_id && payment == 'razorpay') {
                            setOrder_id_razor(get_oder_id[0]);
                            setOrder_id(get_oder_id[1]);
                        } else {
                            if (get_oder_id) {
                                usecheckoutStore.setState({ step: 1 });
                                usecartStore.setState({ cart: [] });
                                usecartStore.setState({ amount: 0 });
                                router.push('/checkout/payment');
                            }
                        }
                    }}
                >
                    Pay
                </LoadingButton>
                {order_id_razor && (
                    <RazorPayModal
                        order_id_razor={order_id_razor}
                        setOrder_id_razor={setOrder_id_razor}
                        order_id={order_id}
                        setLoading={setLoading}
                    />
                )}
            </CardFooter>
        </Card>
    );
};

export default React.memo(OrderSummary);
