'use client';

import { CreditCardIcon, IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card';
import React from 'react';
import { usecheckoutStore } from './store';

const PaymentMethod = ({
    handlePrevious,
    handleNext,
    handlePaymentMethodChange
}: any) => {
    const payment = usecheckoutStore((state: any) => state.payment);
    const contact = usecheckoutStore((state: any) => state.contact);

    return (
        <Card className="border-transparent">
            {/* <CardHeader> */}
            {/* <CardTitle>Payment Options</CardTitle> */}
            {/* </CardHeader> */}
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            payment === 'razorpay'
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 dark:border-gray-800'
                        }`}
                        onClick={() => handlePaymentMethodChange('razorpay')}
                    >
                        <div className="flex items-center gap-2">
                            <CreditCardIcon className="w-6 h-6" />
                            <h3 className="text-lg font-medium">RazorPay</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Pay securely with your credit or debit card or
                            netbanking and more options with RazorPay.
                        </p>
                    </div>
                    <div
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            payment === 'cod'
                                ? 'border-primary bg-primary/10'
                                : 'border-gray-200 dark:border-gray-800'
                        }`}
                        onClick={() => handlePaymentMethodChange('cod')}
                    >
                        <div className="flex items-center gap-2">
                            <IndianRupee className="w-6 h-6" />
                            <h3 className="text-lg font-medium">
                                Cash on Delivery
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Pay with cash when your order is delivered.
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={handlePrevious}>
                    Previous
                </Button>
                <Button
                    onClick={() => {
                        handleNext();
                    }}
                >
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
};

export default React.memo(PaymentMethod);
