'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import Signform from './signform';
import { checkIsAuth } from '@/lib/utils';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
    const router = useRouter();

    useEffect(() => {
        const data = checkIsAuth();
        if (data === 'isauth') {
            router.push('/');
        }
    }, []);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Signform />
            </CardContent>
        </Card>
    );
}
