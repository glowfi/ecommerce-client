'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LoginDocument, LogingoogleDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useuserStore } from '../store';
import { emailSchema, passwordSchema } from './schema';

const FormSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export function Logform() {
    const [, execLogin] = useMutation(LoginDocument);
    const [, execGoogleLogin] = useMutation(LogingoogleDocument);
    const addUser = useuserStore((state: any) => state.addUser);
    const currUser = useuserStore((state: any) => state.user);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        let res = await execLogin(
            {
                data: {
                    email: data.email,
                    password: data.password,
                    userType: 'user'
                }
            },
            { requestPolicy: 'network-only' }
        );

        if (res?.data?.login?.err) {
            toast({
                variant: 'destructive',
                title: 'Authentication Error!',
                description: res?.data?.login?.err
            });
        } else if (res?.data?.login?.data) {
            let address = {
                street_address: res?.data?.login?.data?.address?.streetAddress,
                country: res?.data?.login?.data?.address?.country,
                state: res?.data?.login?.data?.address?.state,
                city: res?.data?.login?.data?.address?.city,
                zipCode: res?.data?.login?.data?.address?.zipCode,
                countryCode: res?.data?.login?.data?.address?.countryCode
            };

            addUser({
                email: res.data?.login?.data?.email,
                profile_pic: res.data?.login?.data?.profilePic,
                name: res.data?.login?.data?.name,
                id: res?.data?.login?.data?.userID,
                address,
                phone_number: res?.data?.login?.data?.phoneNumber
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
                title: 'Some Error occured!',
                description: res?.data?.login?.err as string
            });
        }
        setLoading(false);

        // toast({
        //     title: 'You submitted the following values:',
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     )
        // });
    }

    return (
        <div className="grid gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="xyz@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your registered email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormDescription>
                                        Enter your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-4 text-center text-sm flex flex-col gap-3 underline">
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit">Login</Button>
                        )}
                        <Link
                            href="/auth/signup"
                            className="underline hover:opacity-75 transition-all"
                        >
                            Don&apos;t have an account ? Sign up
                        </Link>
                        <Link
                            href={'/'}
                            className="hover:opacity-75 transition-all"
                        >
                            Go Back to Home
                        </Link>
                        <Link
                            href="/auth/forgetpassword"
                            className="hover:opacity-75 transition-all"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
}
