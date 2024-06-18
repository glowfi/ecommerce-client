'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import GoogleloginButton from './googlelogin';
import { Logform } from './logform';

export function LoginForm() {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <GoogleloginButton />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mt-3">
                    OR
                </h3>

                <Logform />
            </CardContent>
        </Card>
    );
}
