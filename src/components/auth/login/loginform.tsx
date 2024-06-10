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
import { useToast } from '@/components/ui/use-toast';
import { LoadingButton } from '@/components/ui/loading-button';

export function LoginForm() {
    const [, execLogin] = useMutation(LoginDocument);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const addUser = useuserStore((state: any) => state.addUser);
    const currUser = useuserStore((state: any) => state.user);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
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
                                href="/auth/forgetpassword"
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
                    <LoadingButton
                        loading={loading}
                        type="button"
                        className="w-full"
                        onClick={async () => {
                            setLoading(true);
                            let res = await execLogin(
                                {
                                    data: {
                                        email,
                                        password,
                                        userType: 'user'
                                    }
                                },
                                { requestPolicy: 'network-only' }
                            );
                            // console.log(res.data?.login);
                            if (res?.data?.login?.err) {
                                toast({
                                    variant: 'destructive',
                                    title: 'Authentication Error!',
                                    description: res?.data?.login?.err
                                });
                            } else if (res?.data?.login?.data) {
                                let address = {
                                    street_address:
                                        res?.data?.login?.data?.address
                                            ?.streetAddress,
                                    country:
                                        res?.data?.login?.data?.address
                                            ?.country,
                                    state: res?.data?.login?.data?.address
                                        ?.state,
                                    city: res?.data?.login?.data?.address?.city,
                                    zipCode:
                                        res?.data?.login?.data?.address
                                            ?.zipCode,
                                    countryCode:
                                        res?.data?.login?.data?.address
                                            ?.countryCode
                                };

                                addUser({
                                    email: res.data?.login?.data?.email,
                                    profile_pic:
                                        res.data?.login?.data?.profilePic,
                                    name: res.data?.login?.data?.name,
                                    id: res?.data?.login?.data?.userID,
                                    address,
                                    phone_number:
                                        res?.data?.login?.data?.phoneNumber
                                });
                                toast({
                                    variant: 'default',
                                    title: 'Login Successful!',
                                    description: `Logged in as ${res?.data?.login?.data?.name}!`
                                });

                                router.push('/');
                            } else {
                                toast({
                                    variant: 'destructive',
                                    title: 'Some Error occured!'
                                });
                            }
                            setLoading(false);
                        }}
                    >
                        Login
                    </LoadingButton>
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
