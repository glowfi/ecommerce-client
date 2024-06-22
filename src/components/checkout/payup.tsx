import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@radix-ui/react-tooltip';
import React from 'react';
import { Button } from '../ui/button';

const Payup = ({ handlePayment, setOrder_id_razor, setLoading }: any) => {
    return (
        <TooltipProvider>
            <Tooltip open={true}>
                <TooltipTrigger asChild>
                    <Button
                        className="p-3"
                        size={'sm'}
                        onClick={() => {
                            handlePayment(setOrder_id_razor, setLoading);
                        }}
                    >
                        Pay
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="mt-3">Pay with razorpay</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Payup;
