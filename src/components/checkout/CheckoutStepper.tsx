'use client';

import { checkIsAuth } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useuserStore } from '../auth/store';
import { usecartStore } from '../cart/store';
import { useToast } from '../ui/use-toast';
import ContactDetails from './ContactDetails';
import OrderSummary from './OrderSummary';
import PaymentMethod from './PaymentMethod';
import { usecheckoutStore } from './store';

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
        }
    }, [cart, user]);

    return (
        <div className="flex justify-center items-center h-dvh mt-10">
            {cart.length === 0 ? (
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
                    Cart Empty!
                </h2>
            ) : (
                <div>
                    {step === 1 && (
                        <div className="container mt-6 mb-6">
                            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mb-6">
                                Address and Contact
                            </p>

                            <ContactDetails handleNext={handleNext} />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="container mt-6 mb-6">
                            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mb-6">
                                Choose Payment Method
                            </p>
                            <PaymentMethod
                                handleNext={handleNext}
                                handlePrevious={handlePrevious}
                                handlePaymentMethodChange={
                                    handlePaymentMethodChange
                                }
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="container mt-10 mb-6">
                            <p className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center mb-6 mt-6">
                                Order Summary
                            </p>
                            <OrderSummary handlePrevious={handlePrevious} />
                        </div>
                    )}
                </div>
            )}

            {/* {step <= 2 && ( */}
            {/*     <div className="flex justify-center items-center"> */}
            {/*         <Link href="/" className="my-6 underline"> */}
            {/*             Go to Home */}
            {/*         </Link> */}
            {/*     </div> */}
            {/* )} */}
        </div>
    );
}
