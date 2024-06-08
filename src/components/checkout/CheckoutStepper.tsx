'use client';

import { useEffect, useState } from 'react';
import { ContactDetails } from './ContactDetails';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import { usecheckoutStore } from './store';
import { useuserStore } from '../auth/store';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { usecartStore } from '../cart/store';
import { checkIsAuth } from '@/lib/utils';
import Link from 'next/link';

export default function CheckoutStepper() {
    const router = useRouter();
    const user = useuserStore((state: any) => state.user);
    const cart = usecartStore((state: any) => state.cart);

    const updatePayment = usecheckoutStore((state: any) => state.updatePayment);
    const step = usecheckoutStore((state: any) => state.step);
    const setStep = usecheckoutStore((state: any) => state.setStep);
    const { toast } = useToast();

    const handleNext = () => {
        setStep(step + 1);
    };
    const handlePrevious = () => {
        setStep(step - 1);
    };
    const handlePaymentMethodChange = (method: any) => {
        updatePayment(method);
    };

    useEffect(() => {
        const data = checkIsAuth();
        if (data === 'auth') {
            toast({
                variant: 'destructive',
                title: 'Authentication!',
                description: 'Login to purchase products!'
            });
            router.push('/auth/login');
        } else if (data === 'cart') {
            toast({
                variant: 'destructive',
                title: 'Notification',
                description:
                    'Cart Empty! Add some products to cart before checkking out'
            });
            router.push('/');
        }
    }, [cart, user]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-6">
                Checkout
            </h1>
            <div className="mb-8">
                {step === 1 && (
                    <div>
                        <div className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
                            Address and Contact
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
                            Payment
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <div className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
                            Order Summary
                        </div>
                    </div>
                )}
            </div>
            {step === 1 && <ContactDetails handleNext={handleNext} />}
            {step === 2 && (
                <PaymentMethod
                    handleNext={handleNext}
                    handlePrevious={handlePrevious}
                    handlePaymentMethodChange={handlePaymentMethodChange}
                />
            )}
            {step === 3 && <OrderSummary handlePrevious={handlePrevious} />}
            <div className="flex justify-center items-center">
                <Link href="/" className="my-6 underline">
                    Go to Home
                </Link>
            </div>
        </div>
    );
}