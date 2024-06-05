'use client';

import { UpdateordersDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { usecheckoutStore } from './store';

export default function RazorPayModal({
    order_id_razor,
    order_id,
    setOrder_id_razor,
    setLoading
}: any) {
    const [Razorpay, isLoaded] = useRazorpay();
    const [, execUpdateOrder] = useMutation(UpdateordersDocument);
    const { toast } = useToast();
    const router = useRouter();
    const setStep = usecheckoutStore((state: any) => state.setStep);

    const handlePayment = useCallback(
        (setOrder_id_razor: any, setLoading: any) => {
            // const order = await createOrder(params);

            const options: RazorpayOptions = {
                key: process.env.RAZER_KEY_ID as string,
                amount: '',
                currency: 'INR',
                name: 'Nimbus Store',
                description: 'Transaction',
                image: process.env.LOGO_URL,
                order_id: order_id_razor,
                handler: async (res) => {
                    setOrder_id_razor('');
                    await execUpdateOrder({
                        data: {
                            orderID: order_id,
                            hasFailed: false,
                            isPending: false,
                            razorpayDetails: {
                                razorpayOrderId: res.razorpay_order_id,
                                razorpayPaymentId: res.razorpay_payment_id,
                                razorpaySignature: res.razorpay_signature
                            }
                        }
                    });

                    toast({
                        title: 'Info!',
                        description: 'Payment Success!'
                    });
                    router.push('/');

                    console.log('Payment Success!');
                    console.log(res);
                },
                prefill: {
                    name: '',
                    email: '',
                    contact: ''
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#09090b'
                }
            };

            const rzpay = new Razorpay(options);
            rzpay.on('payment.failed', async function (res) {
                console.log('Payment failed!');
                await execUpdateOrder({
                    data: {
                        orderID: order_id,
                        hasFailed: true,
                        isPending: false,
                        razorpayDetails: {
                            razorpayOrderId: '',
                            razorpayPaymentId: '',
                            razorpaySignature: ''
                        }
                    }
                });

                // toast({
                //     variant: 'destructive',
                //     title: 'Info!',
                //     description: 'Payment Failed!'
                // });
                // router.push('/');
            });
            rzpay.open();
        },
        [Razorpay]
    );

    useEffect(() => {
        if (isLoaded) {
            handlePayment(setOrder_id_razor, setLoading);
        }
    }, [isLoaded, handlePayment]);

    return (
        <div className="App">
            <Button
                variant={'secondary'}
                onClick={() => {
                    handlePayment(setOrder_id_razor, setLoading);
                }}
            >
                Pay with razorpay
            </Button>
            {/* <button onClick={handlePayment}>Pay with razorpay</button> */}
        </div>
    );
}
