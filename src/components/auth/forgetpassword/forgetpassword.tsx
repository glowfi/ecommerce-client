'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ForgpassDocument } from '@/gql/graphql';
import { detectBrowser, getOS } from '@/lib/utils';
import { useMutation } from '@urql/next';
import Link from 'next/link';
import { useState } from 'react';

function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const ForgetPasswordForm = () => {
    const [, execForgetPass] = useMutation(ForgpassDocument);
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    return (
        <div className="flex h-dvh justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email below to send a link to your email to
                        reset password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-col justify-center items-center w-full m-3 gap-3">
                        <Button
                            className="w-full"
                            onClick={async () => {
                                if (!email || !isValidEmail(email)) {
                                    toast({
                                        title: 'Error',
                                        variant: 'destructive',
                                        description:
                                            'Please provide a valid email address!'
                                    });
                                    return;
                                }
                                let os = getOS();
                                let browser = detectBrowser();
                                let data = await execForgetPass({
                                    data: {
                                        email,
                                        os,
                                        browser: browser as string,
                                        userType: 'user'
                                    }
                                });
                                setEmail('');
                                toast({
                                    title: 'Notification',
                                    description:
                                        'If an email exists in our database then please check your email for password reset link!'
                                });
                            }}
                        >
                            Send Link
                        </Button>
                        <Link
                            className="hover:opacity-75 transition-all underline"
                            href={'/'}
                        >
                            Go Back to Home
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ForgetPasswordForm;
