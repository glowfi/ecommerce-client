'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { useState } from 'react';
import { useuserStore } from '../store';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const [, execLogin] = useMutation(LoginDocument);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const addUser = useuserStore((state: any) => state.addUser);
    const currUser = useuserStore((state: any) => state.user);
    const router = useRouter();

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <form action={loginaction}> */}
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(() => e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            name="password"
                            onChange={(e) => setPassword(() => e.target.value)}
                        />
                    </div>
                    <Button
                        type="button"
                        className="w-full"
                        onClick={async () => {
                            let res = await execLogin({
                                data: {
                                    email,
                                    password,
                                    userType: 'seller'
                                }
                            });
                            addUser({
                                email: res.data?.login?.data?.email
                            });
                            console.log(currUser);
                            router.push('/');
                        }}
                    >
                        Login
                    </Button>
                </div>
                {/* </form> */}
                <div className="mt-4 text-center text-sm flex flex-col gap-3 underline">
                    <Link href="/auth/signup" className="underline">
                        Don&apos;t have an account ? Sign up
                    </Link>
                    <Link href={'/'}>Go Back to Home</Link>
                </div>
            </CardContent>
        </Card>
    );
}
