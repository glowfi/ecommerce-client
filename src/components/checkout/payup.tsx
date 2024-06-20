import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent
} from '@radix-ui/react-tooltip';
import React from 'react';
import { Button } from '../ui/button';

const Payup = () => {
    return (
        <TooltipProvider>
            <Tooltip open={true}>
                <TooltipTrigger asChild>
                    <Button>Pay</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="mt-3">Pay with razorpay</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default Payup;
