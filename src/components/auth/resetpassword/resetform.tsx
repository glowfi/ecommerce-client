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
import { useToast } from '@/components/ui/use-toast';
import { ResetpassDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { confirmpasswordSchema, passwordSchema } from './schema';

const FormSchema = z
    .object({
        password: passwordSchema,
        confirmpassword: confirmpasswordSchema
    })
    .refine((data) => data.password === data.confirmpassword, {
        message: "Passwords don't match",
        path: ['confirmpassword'] // path of error
    });

const ResetForm = ({ ID }: any) => {
    const [, execReset] = useMutation(ResetpassDocument);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                token: ID as string
            }
        });
        console.log(res, ID);
        if (res?.data?.resetPassword?.err) {
            toast({
                variant: 'destructive',
                title: 'Token Expired!',
                description: res?.data.resetPassword?.err
            });
        } else {
            toast({
                title: 'Password Reset',
                description: 'Password reset successful!'
            });

            router.push('/auth/login');
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="New Password"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your new password.
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
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter the same password as above.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="mt-4 text-center text-sm flex flex-col gap-3">
                    {loading ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit">Reset Password</Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default ResetForm;
