import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
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
import { z } from 'zod';
import CountrySelect from '../ui/country-select';
import { PhoneInput } from '../ui/phone-input';
import RegionSelect from '../ui/region-select';
import { User } from './mydetails';

import { useToast } from '@/components/ui/use-toast';
import { UpdateuserDocument } from '@/gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@urql/next';
import lookup from 'country-code-lookup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useuserStore } from '../auth/store';
import { LoadingButton } from '../ui/loading-button';
import {
    citySchema,
    countrySchema,
    // emailSchema,
    nameSchema,
    phoneNumbeSchema,
    stateSchema,
    streetAddressSchema,
    zipCodeSchema
} from './schema';

// @ts-ignore
const UserUpdate = ({ userdetails }: User) => {
    const FormSchema = z.object({
        name: nameSchema,
        // email: emailSchema,
        streetAddress: streetAddressSchema,
        country: countrySchema,
        state: stateSchema,
        city: citySchema,
        zipCode: zipCodeSchema,
        phoneNumber: phoneNumbeSchema
    });

    const [countryCode, setCountryCode] = useState(
        userdetails?.address?.countryCode
    );
    const [state, setState] = useState(userdetails?.address?.state);

    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [, execUpdate] = useMutation(UpdateuserDocument);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: userdetails?.name,
            // email: userdetails?.email,
            streetAddress: userdetails?.address?.streetAddress,
            country: countryCode,
            state: state,
            city: userdetails?.address?.city,
            zipCode: parseInt(userdetails?.address?.zipCode),
            phoneNumber: userdetails?.phoneNumber
        }
    });
    const user = useuserStore.getState().user;
    const router = useRouter();

    

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        data.state = state;
        data.country = countryCode;
        // @ts-ignore
        data.zipCode = parseInt(data.zipCode as number) as number;
        let address = {
            state: data.state,
            countryCode: data.country,
            country: lookup.byIso(data.country)?.country,
            city: data.city,
            zipCode: data.zipCode,
            streetAddress: data.streetAddress
        };

        const res = await execUpdate({
            data: {
                phoneNumber: data.phoneNumber,
                address,
                name: data.name
                // email: data.email
            },
            userId: user.id
        });

        if (res?.data?.updateUser?.data) {
            let newObj = structuredClone(address);
            //@ts-ignore
            newObj['street_address'] = newObj['streetAddress'];
            //@ts-ignore
            delete newObj['streetAddress'];
            useuserStore.setState({
                user: {
                    ...useuserStore.getState().user,
                    address: newObj,
                    name: data.name,
                    phone_number: data.phoneNumber
                }
            });
            toast({
                title: 'Success!',
                description: 'Updated Values!'
            });
            router.refresh();
            // router.push(`/user/${user?.id}`);
        } else if (res?.data?.updateUser?.err) {
            toast({
                variant: 'destructive',

                title: 'Error!',
                description: res?.data?.updateUser?.err
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you
                        are done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fullname</FormLabel>
                                        <FormControl>
                                            <Input
                                                defaultValue={userdetails?.name}
                                                placeholder="Fullname"
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
                        <div className="grid gap-4 py-4">
                            {/* <FormField */}
                            {/*     control={form.control} */}
                            {/*     name="email" */}
                            {/*     render={({ field }) => ( */}
                            {/*         <FormItem> */}
                            {/*             <FormLabel>Email</FormLabel> */}
                            {/*             <FormControl> */}
                            {/*                 <Input */}
                            {/*                     defaultValue={ */}
                            {/*                         userdetails?.email */}
                            {/*                     } */}
                            {/*                     placeholder="Email" */}
                            {/*                     {...field} */}
                            {/*                 /> */}
                            {/*             </FormControl> */}
                            {/*             <FormDescription> */}
                            {/*                 Enter your email address. */}
                            {/*             </FormDescription> */}
                            {/*             <FormMessage /> */}
                            {/*         </FormItem> */}
                            {/*     )} */}
                            {/* /> */}
                        </div>
                        <div className="grid gap-2 mb-2">
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Address</FormLabel>
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
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <CountrySelect
                                                    defaultValue={countryCode}
                                                    onChangeCapture={
                                                        setCountryCode
                                                    }
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
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <RegionSelect
                                                    countryCode={countryCode}
                                                    defaultValue={state}
                                                    onChangeCapture={setState}
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
                                            <FormLabel>ZipCode</FormLabel>
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
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                defaultValue={
                                                    userdetails?.phoneNumber as number
                                                }
                                                placeholder="Enter a phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <LoadingButton
                            loading={loading}
                            type="submit"
                            className="mt-6 w-full"
                        >
                            Save Changes
                        </LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(UserUpdate);
