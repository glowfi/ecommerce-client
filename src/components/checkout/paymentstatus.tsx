'use client';
import { checkIsAuth } from '@/lib/utils';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const Paymentstatus = () => {
    const router = useRouter();

    useEffect(() => {
        const data = checkIsAuth();
        if (data === 'auth') {
            toast({
                variant: 'destructive',
                title: 'Authentication!',
                description: 'Please Login !'
            });
            router.push('/auth/login');
        }
    }, []);

    return (
        <div className="text-center flex flex-col justify-center items-center h-dvh">
            <h1 className="mb-4 text-6xl font-semibold">Payment Success!</h1>
            <div className="animate-bounce">
                <MailCheck className="h-40 w-40 text-green-500" />
            </div>
            <p className="mt-4">
                <Link
                    href="/"
                    className="underline hover:opacity-75 transition-all"
                >
                    Go to Home Page
                </Link>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Please check your email for order status and receipt.
            </p>
        </div>
    );
};

export default Paymentstatus;
