'use client';

import { CreateorderDocument } from '@/gql/graphql';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@urql/next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useuserStore } from '../auth/store';
import { usecartStore } from '../cart/store';
import { Button } from '../ui/button';
import { LoadingButton } from '../ui/loading-button';
import RazorPayModal from './RazorPayModal';
import { usecheckoutStore } from './store';

import Link from 'next/link';
import { SHIPPING_AMOUNT, TAX_AMOUNT } from '../cart/constants';
import { useuserinfo } from '../user/store';
import { SkeletonCard } from '../product/SkeletonCard';
import LoadingSpinner from '../loadingspinners/loadingspinner';

const OrderSummary = ({ handlePrevious }: any) => {
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

    const [shouldbedisabled, setShouldbedisabled] = useState(false);

    const [ispaymentprocessing, setIspaymentprocessing] = useState(false);

    let productsOrdered = [];
    for (let index = 0; index < cart.length; index++) {
        let currProd = cart[index];
        productsOrdered.push([currProd.id, currProd.quantity.toString()]);
    }

    return (
        <>
            {ispaymentprocessing ? (
                <div className="flex items-center justify-center">
                    <LoadingSpinner name="payment processing" />
                </div>
            ) : (
                <div className="container rounded-lg p-6 shadow-sm h-dvh w-[70vw]">
                    <h2 className="text-lg font-semibold">Cart Items</h2>
                    <div className="mt-4 space-y-4">
                        {cart.map((p: any, idx: any) => {
                            return (
                                <div
                                    className="flex items-start justify-between"
                                    key={idx}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:block rounded-md">
                                            {!loaded && (
                                                <SkeletonCard
                                                    props={{
                                                        w: '200',
                                                        h: '200'
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <Image
                                            onLoad={() => setLoaded(true)}
                                            src={p?.coverImage?.[1]}
                                            alt="Product Image"
                                            width={100}
                                            height={100}
                                            className="hidden md:block rounded-md"
                                        />
                                        <div className="flex flex-col justify-center items-start">
                                            <Link
                                                className="text-base font-medium underline hover:cursor-pointer hover:opacity-85 hover:animate-pulse"
                                                href={`/product/${p?.id}`}
                                            >
                                                {p?.title}
                                            </Link>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {p?.brand}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                x{p?.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                ${p?.price} p/c
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base font-semibold">
                                            $
                                            {(
                                                ((100 - p?.discountPercent) /
                                                    100) *
                                                p?.price *
                                                p?.quantity
                                            ).toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <Separator className="my-6" />
                        <div className="flex items-center justify-between">
                            <span className="text-base  font-semibold">
                                Subtotal
                            </span>
                            <span className="text-base font-semibold">
                                ${amount.toFixed(0)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold">
                                Shipping
                            </span>
                            <span className="text-base font-semibold">
                                ${TAX_AMOUNT}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-semibold">Tax</span>
                            <span className="text-base font-semibold">
                                ${SHIPPING_AMOUNT}
                            </span>
                        </div>
                        <Separator className="my-6" />
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-semibold">
                                $
                                {(
                                    amount +
                                    TAX_AMOUNT +
                                    SHIPPING_AMOUNT
                                ).toFixed(0)}
                            </span>
                        </div>

                        <Separator />
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6">
                                    Shipping Details
                                </h4>
                            </div>
                            <div className="flex flex-col">
                                <p className="leading-7 [&:not(:first-child)]:mt-0">
                                    <b> Name</b> : {user.name}
                                </p>
                                <p className="leading-7 [&:not(:first-child)]:mt-0">
                                    <b>Email</b> : {user.email}
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
                                    <b>Payment Mode</b> :{' '}
                                    {payment.toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between gap-3 mt-6 sm:mt-3 mb-3">
                            <Button variant="outline" onClick={handlePrevious}>
                                Previous
                            </Button>
                            <LoadingButton
                                loading={loading}
                                className={`${shouldbedisabled ? 'hidden' : 'flex text-center justify-center items-center p-3'}`}
                                onClick={async () => {
                                    setLoading(true);

                                    let newContact = JSON.parse(
                                        JSON.stringify(contact)
                                    );
                                    let currVal =
                                        newContact.address.street_address;
                                    let currVal1 = newContact.phone_number;

                                    delete newContact.address.street_address;
                                    delete newContact.address.phoneNumber;

                                    newContact['address']['streetAddress'] =
                                        currVal;
                                    newContact['phoneNumber'] = currVal1;

                                    let savedEmail = newContact.email;
                                    let savedName = newContact.name;
                                    let savedChecked = newContact.checked;

                                    let currVal2 = newContact.countryCode;
                                    delete newContact.countryCode;
                                    newContact['address']['countryCode'] =
                                        currVal2;
                                    delete newContact.phone_number;
                                    delete newContact.email;
                                    delete newContact.name;
                                    delete newContact.update_address;
                                    delete newContact.checked;

                                    let data = await execCreateOrder({
                                        data: {
                                            paymentBy: payment,
                                            amount: parseInt(
                                                parseFloat(
                                                    amount +
                                                        TAX_AMOUNT +
                                                        SHIPPING_AMOUNT
                                                ).toFixed(2)
                                            ),
                                            productsOrdered,
                                            userID: user.id,
                                            userDetails: {
                                                ...newContact
                                            },
                                            name: savedName,
                                            email: savedEmail,
                                            phoneNumber: newContact.phoneNumber,
                                            address: newContact.address,
                                            updateAddress: savedChecked
                                                ? true
                                                : false,
                                            tax: TAX_AMOUNT,
                                            shippingFee: SHIPPING_AMOUNT
                                        }
                                    });

                                    let get_oder_id = data?.data?.createOrder;

                                    if (get_oder_id && payment == 'razorpay') {
                                        
                                        setOrder_id_razor(get_oder_id[0]);
                                        setOrder_id(get_oder_id[1]);
                                        setShouldbedisabled(true);
                                    } else {
                                        if (get_oder_id) {
                                            usecheckoutStore.setState({
                                                step: 1
                                            });
                                            usecartStore.setState({ cart: [] });
                                            usecartStore.setState({
                                                amount: 0
                                            });
                                            router.push('/checkout/payment');
                                        }
                                    }

                                    useuserinfo.setState({
                                        pageIdx_order: 0,
                                        hasMore_order: true,
                                        lastIdx_order: -1,
                                        allOrders: {}
                                    });
                                    setLoading(false);
                                }}
                            >
                                Create Order
                            </LoadingButton>
                            {order_id_razor && (
                                <RazorPayModal
                                    order_id_razor={order_id_razor}
                                    setOrder_id_razor={setOrder_id_razor}
                                    order_id={order_id}
                                    setLoading={setLoading}
                                    email={user?.email}
                                    name={user?.name}
                                    phone_number={user?.phone_number}
                                    setIspaymentprocessing={
                                        setIspaymentprocessing
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(OrderSummary);
