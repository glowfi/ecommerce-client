'use client';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import lookup from 'country-code-lookup';
import { useuserStore } from '../auth/store';
import CountrySelect from '../ui/country-select';
import { PhoneInput } from '../ui/phone-input';
import RegionSelect from '../ui/region-select';
import {
    citySchema,
    countrySchema,
    // dobSchema,
    phoneNumbeSchema,
    stateSchema,
    streetAddressSchema,
    updateAddressSchema,
    zipCodeSchema
} from './schema';
import { usecheckoutStore } from './store';

const FormSchema = z.object({
    streetAddress: streetAddressSchema,
    country: countrySchema,
    state: stateSchema,
    city: citySchema,
    zipCode: zipCodeSchema,
    // dob: dobSchema,
    phoneNumber: phoneNumbeSchema,
    checked: updateAddressSchema
});

export function ContactDetails({ handleNext }: any) {
    const contact = usecheckoutStore((state: any) => state.contact);
    // const [countryCode, setCountryCode] = useState('');
    const user = useuserStore((state: any) => state.user);

    const setCountryCode = usecheckoutStore(
        (state: any) => state.setCountryCode
    );

    const setRegion = usecheckoutStore((state: any) => state.setRegion);

    const createNewState = usecheckoutStore(
        (state: any) => state.createNewState
    );

    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            streetAddress: contact.address.street_address
                ? contact.address.street_address
                : user?.address?.street_address,
            country: contact.address.countryCode
                ? contact.address.countryCode
                : user?.address?.countryCode,
            state: contact.address.state
                ? contact.address.state
                : user?.address?.state,
            city: contact.address.city
                ? contact.address.city
                : user?.address?.city,
            zipCode: contact.address.zipCode
                ? parseInt(contact.address.zipCode)
                : parseInt(user?.address?.zipCode),
            phoneNumber: contact.phone_number
                ? contact.phone_number
                : user?.phone_number,
            checked: contact.checked
        }
    });

    const updateContacts = usecheckoutStore(
        (state: any) => state.updateContacts
    );

    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleNext();

        let output = {
            name: user.name,
            email: user.email,
            countryCode: data.country,
            checked: data.checked,
            address: {
                street_address: data.streetAddress,
                // ? data.streetAddress
                // : user.address.street_address,
                countryCode: data.country,
                country: data.country
                    ? lookup.byIso(data.country)?.country
                    : '',
                state: data.state,
                // ? data.state : user.address.zipCode,
                city: data.city,
                // ? data.city : user.address.city,
                zipCode: data.zipCode
                // ? data.zipCode : user.address.zipCode
            },
            phone_number: data.phoneNumber
            // ? data.phoneNumber
            // : user.phone_number
        };
        createNewState(output);

        // toast({
        //     title: 'You submitted the following values:',
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(output, null, 2)}
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
                    {/* <div className="grid gap-2"> */}
                    {/*     <FormField */}
                    {/*         control={form.control} */}
                    {/*         name="fullname" */}
                    {/*         render={({ field }) => ( */}
                    {/*             <FormItem> */}
                    {/*                 <FormLabel>Fullname</FormLabel> */}
                    {/*                 <FormControl> */}
                    {/*                     <Input */}
                    {/*                         placeholder="John Doe" */}
                    {/*                         {...field} */}
                    {/*                     /> */}
                    {/*                 </FormControl> */}
                    {/*                 <FormDescription> */}
                    {/*                     Enter your Fullname. */}
                    {/*                 </FormDescription> */}
                    {/*                 <FormMessage /> */}
                    {/*             </FormItem> */}
                    {/*         )} */}
                    {/*     /> */}
                    {/* </div> */}
                    {/* <div className="grid gap-2"> */}
                    {/*     <FormField */}
                    {/*         control={form.control} */}
                    {/*         name="email" */}
                    {/*         render={({ field }) => ( */}
                    {/*             <FormItem> */}
                    {/*                 <FormLabel>Email</FormLabel> */}
                    {/*                 <FormControl> */}
                    {/*                     <Input */}
                    {/*                         placeholder="xyz@email.com" */}
                    {/*                         {...field} */}
                    {/*                     /> */}
                    {/*                 </FormControl> */}
                    {/*                 <FormDescription> */}
                    {/*                     Enter your email address. */}
                    {/*                 </FormDescription> */}
                    {/*                 <FormMessage /> */}
                    {/*             </FormItem> */}
                    {/*         )} */}
                    {/*     /> */}
                    {/* </div> */}
                    {/* <div className="grid gap-2"> */}
                    {/*     <FormField */}
                    {/*         control={form.control} */}
                    {/*         name="password" */}
                    {/*         render={({ field }) => ( */}
                    {/*             <FormItem> */}
                    {/*                 <FormLabel>Password</FormLabel> */}
                    {/*                 <FormControl> */}
                    {/*                     <Input */}
                    {/*                         type="password" */}
                    {/*                         placeholder="Password" */}
                    {/*                         {...field} */}
                    {/*                     /> */}
                    {/*                 </FormControl> */}
                    {/*                 <FormDescription> */}
                    {/*                     Enter a secure password */}
                    {/*                 </FormDescription> */}
                    {/*                 <FormMessage /> */}
                    {/*             </FormItem> */}
                    {/*         )} */}
                    {/*     /> */}
                    {/* </div> */}
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
                                            onChangeCapture={() => {
                                                updateContacts(
                                                    'street_address',
                                                    field.value,
                                                    true
                                                );
                                            }}
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
                                                defaultValue={
                                                    contact.address.countryCode
                                                        ? contact.address
                                                              .countryCode
                                                        : user?.address
                                                              ?.countryCode
                                                }
                                                onChangeCapture={setCountryCode}
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
                                                countryCode={
                                                    contact.address.countryCode
                                                }
                                                {...field}
                                                defaultValue={
                                                    contact.address.state
                                                        ? contact.address.state
                                                        : user?.address?.state
                                                }
                                                onChangeCapture={setRegion}
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
                                                onChangeCapture={() => {
                                                    updateContacts(
                                                        'city',
                                                        field.value,
                                                        true
                                                    );
                                                }}
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
                                                onChangeCapture={() => {
                                                    updateContacts(
                                                        'zipCode',
                                                        parseInt(
                                                            //@ts-ignore
                                                            field.value as number
                                                        ) as number,
                                                        true
                                                    );
                                                }}
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
                                            placeholder="Enter a phone number"
                                            // onChange={setPhonenumber}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* <div className="grid gap-2"> */}
                    {/*     <FormField */}
                    {/*         control={form.control} */}
                    {/*         name="dob" */}
                    {/*         render={({ field }) => ( */}
                    {/*             <FormItem> */}
                    {/*                 <FormLabel>Date of Birth</FormLabel> */}
                    {/*                 <FormControl> */}
                    {/*                     <Input */}
                    {/*                         type="date" */}
                    {/*                         placeholder="Enter DOB" */}
                    {/*                         {...field} */}
                    {/*                     /> */}
                    {/*                 </FormControl> */}
                    {/*                 <FormMessage /> */}
                    {/*             </FormItem> */}
                    {/*         )} */}
                    {/*     /> */}
                    {/* </div> */}

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="checked"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <>
                                            <Checkbox
                                                checked={contact.checked}
                                                onCheckedChange={(value) => {
                                                    updateContacts(
                                                        'checked',
                                                        value
                                                    );
                                                    field.onChange(value);
                                                }}
                                            />
                                            <FormLabel className="ml-3">
                                                Save Address to database for
                                                future use
                                            </FormLabel>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="submit">Next</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
