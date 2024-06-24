'use client';

import { UpdateordersDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import { usecartStore } from '../cart/store';
import { useToast } from '../ui/use-toast';
import Payup from './payup';
import { usecheckoutStore } from './store';

export default function RazorPayModal({
    order_id_razor,
    order_id,
    setOrder_id_razor,
    setLoading,
    name,
    email,
    phone_number,
    setIspaymentprocessing
}: any) {
    const [Razorpay, isLoaded] = useRazorpay();
    const [, execUpdateOrder] = useMutation(UpdateordersDocument);
    const { toast } = useToast();
    const router = useRouter();

    const handlePayment = useCallback(
        (setOrder_id_razor: any, setLoading: any) => {
            const options: RazorpayOptions = {
                key: process.env.RAZORPAY_KEY_ID as string,
                amount: '',
                currency: 'INR',
                name: 'Nimbus Store',
                description: 'Transaction',
                image: process.env.LOGO_URL,
                order_id: order_id_razor,
                handler: async (res) => {
                    setIspaymentprocessing(true);
                    setOrder_id_razor('');

                    await execUpdateOrder(
                        {
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
                        },
                        { requestPolicy: 'network-only' }
                    );

                    usecheckoutStore.setState({ step: 1 });
                    usecartStore.setState({ cart: [] });
                    usecartStore.setState({ amount: 0 });

                    toast({
                        title: 'Info!',
                        description: 'Payment Success!'
                    });
                    router.push('/checkout/payment');
                    setIspaymentprocessing(false);
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: phone_number
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#09090b'
                }
            };

            const rzpay = new Razorpay(options);
            rzpay.on('payment.failed', async function (res: any) {
                await execUpdateOrder(
                    {
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
                    },
                    { requestPolicy: 'network-only' }
                );
            });
            rzpay.open();
        },
        [Razorpay, order_id, order_id_razor]
    );

    // useEffect(() => {
    //     if (isLoaded) {
    //         handlePayment(setOrder_id_razor, setLoading);
    //     }
    // }, [isLoaded, handlePayment, order_id_razor, order_id]);

    return (
        <div className="mt-3">
            <Payup
                handlePayment={handlePayment}
                setOrder_id_razor={setOrder_id_razor}
                setLoading={setLoading}
            />
        </div>
    );
}
