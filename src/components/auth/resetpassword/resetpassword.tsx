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
import { OtpexpiredDocument, ResetpassDocument } from '@/gql/graphql';
import { useMutation, useQuery } from '@urql/next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPasswordForm = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const router = useRouter();

    const [result, reexecuteQuery] = useQuery({
        query: OtpexpiredDocument,
        variables: {
            data: { token: ID as string }
        },
        requestPolicy: 'network-only'
    });
    const { data, fetching, error } = result;

    const [, execReset] = useMutation(ResetpassDocument);
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const { toast } = useToast();

    if (fetching) {
        return (
            <div className="flex h-dvh justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    Loading ...
                </h1>
            </div>
        );
    }
    console.log(data);

    if (
        data?.checkOtpExpired?.data?.hasExpired ||
        !data?.checkOtpExpired?.data
    ) {
        console.log(data?.checkOtpExpired?.data?.hasExpired);
        return (
            <div className="flex flex-col h-dvh justify-center items-center gap-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    Link has expired!
                </h1>
                <div className="flex flex-col justify-center items-center">
                    <p className="underline font-semibold">
                        <Link href={'/auth/forgetpassword'}>
                            Reissue a new Link
                        </Link>
                    </p>
                    <p className="underline font-semibold">
                        <Link href={'/'}>Go back to home</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-dvh justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Enter a secure password.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmpass">Confirm Password</Label>
                        <Input
                            id="confirmpass"
                            type="password"
                            value={confirmpass}
                            onChange={(e) => setConfirmpass(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={async () => {
                            let data = await execReset({
                                data: {
                                    password,
                                    token: ID as string
                                }
                            });
                            console.log(data);
                            if (data?.data?.resetPassword?.err) {
                                toast({
                                    variant: 'destructive',
                                    title: 'Token Expired!',
                                    description: data?.data.resetPassword?.err
                                });
                            } else {
                                router.push('/auth/login');
                            }
                        }}
                    >
                        Reset Password
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;
