'use client';

import { Input } from '@/components/ui/input';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import CountrySelect from '@/components/ui/country-select';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
import RegionSelect from '@/components/ui/region-select';
import { useToast } from '@/components/ui/use-toast';
import { SignupDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import lookup from 'country-code-lookup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    citySchema,
    countrySchema,
    dobSchema,
    emailSchema,
    fullnameSchema,
    passwordSchema,
    phoneNumbeSchema,
    stateSchema,
    streetAddressSchema,
    zipCodeSchema
} from './schema';
import { Loader2 } from 'lucide-react';

const Signform = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [countryCode, setCountryCode] = useState('');
    const [state, setState] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const { toast } = useToast();
    const [, execSignup] = useMutation(SignupDocument);

    const FormSchema = z.object({
        fullname: fullnameSchema,
        email: emailSchema,
        password: passwordSchema,
        country: countrySchema,
        state: stateSchema,
        city: citySchema,
        zipCode: zipCodeSchema,
        dob: dobSchema,
        phoneNumber: phoneNumbeSchema,
        streetAddress: streetAddressSchema
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
            country: '',
            state: '',
            city: '',
            zipCode: 0,
            dob: '',
            phoneNumber: '',
            streetAddress: ''
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        data.country = countryCode;
        data.state = state;
        data.phoneNumber = phonenumber;

        let res = await execSignup({
            data: {
                name: data.fullname,
                email: data.email,
                password: data.password,
                address: {
                    streetAddress: data.streetAddress,
                    country: data.country
                        ? lookup.byIso(data.country)?.country
                        : '',
                    state: data.state,
                    zipCode: data.zipCode as any,
                    city: data.city
                },
                phoneNumber: data.phoneNumber,
                dob: data.dob
            }
        });

        if (res?.data?.createUser?.data) {
            toast({
                title: 'Info!',
                description: 'Check your email for account confirmation link!'
            });
            router.push('/auth/login');
        } else if (res?.data?.createUser?.err) {
            toast({
                title: 'Info!',
                description: res?.data?.createUser?.err
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
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fullname</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your Fullname.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="xyz@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email address.
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
                                        Enter a secure password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                Fill Optional Fields
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-2 mb-2">
                                    <FormField
                                        control={form.control}
                                        name="streetAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Street Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter streetAddress"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Country
                                                    </FormLabel>
                                                    <FormControl>
                                                        <CountrySelect
                                                            onChange={
                                                                setCountryCode
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <RegionSelect
                                                            countryCode={
                                                                countryCode
                                                            }
                                                            onChange={setState}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter city"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="zipCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        ZipCode
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Enter zipcode"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Phone Number
                                                </FormLabel>
                                                <FormControl>
                                                    <PhoneInput
                                                        placeholder="Enter a phone number"
                                                        onChange={
                                                            setPhonenumber
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Date of Birth
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        placeholder="Enter DOB"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {/* <FormMessage /> */}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="mt-4 text-center text-sm flex flex-col gap-3">
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit">Signup</Button>
                        )}

                        <Link
                            href="/auth/login"
                            className="underline hover:opacity-75 transition-all"
                        >
                            Already have an account ? Sign in
                        </Link>
                        <Link
                            className="hover:opacity-75 transition-all"
                            href={'/'}
                        >
                            Go Back to Home
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Signform;
