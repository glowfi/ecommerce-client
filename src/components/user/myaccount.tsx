'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { ResetpassDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useuserStore } from '../auth/store';
import { useToast } from '../ui/use-toast';
import { confirmpasswordSchema, passwordSchema } from './schema';

const Myaccount = () => {
    const { toast } = useToast();
    const [, execReset] = useMutation(ResetpassDocument);
    const [loading, setLoading] = useState(false);
    const user = useuserStore.getState().user;

    const FormSchema = z
        .object({
            password: passwordSchema,
            confirmpassword: confirmpasswordSchema
        })
        .refine((data) => data.password === data.confirmpassword, {
            message: 'Password do not match',
            path: ['confirmpassword']
        });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: '',
            confirmpassword: ''
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        let res = await execReset({
            data: {
                password: data.password,
                token: 'fromacc',
                userid: user.id
            }
        });

        if (res?.data?.resetPassword?.err) {
            toast({
                variant: 'destructive',
                title: 'Some error occured!',
                description: res?.data.resetPassword?.err
            });
        } else {
            toast({
                title: 'Password Reset',
                description: 'Password reset successful!'
            });
            form.reset();
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
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 max-sm">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Reset Password
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter a secure password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="confirm password"
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter same password as above.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit">Reset Password</Button>
                        )}
                    </form>
                </Form>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Delete Account
                </h2>
                <Button variant={'destructive'} className="w-fit">
                    Delete Account
                </Button>
            </div>
        </div>
    );
};

export default React.memo(Myaccount);
