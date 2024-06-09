'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from '@/components/ui/card';
import CountrySelect from '@/components/ui/country-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import RegionSelect from '@/components/ui/region-select';
import lookup from 'country-code-lookup';
import { usecheckoutStore } from './store';
import { useuserStore } from '../auth/store';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export function ContactDetails({ handleNext }: any) {
    const contact = usecheckoutStore((state: any) => state.contact);
    const user = useuserStore((state: any) => state.user);

    const createNewState = usecheckoutStore(
        (state: any) => state.createNewState
    );

    const updateContacts = usecheckoutStore(
        (state: any) => state.updateContacts
    );
    const setPhonenumber = usecheckoutStore(
        (state: any) => state.setPhonenumber
    );

    const setCountryCode = usecheckoutStore(
        (state: any) => state.setCountryCode
    );

    const setRegion = usecheckoutStore((state: any) => state.setRegion);

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardDescription>Shipping Information</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder={user.name}
                            // value={contact.name}
                            onChange={(e) => {
                                // setName(e.target.value);
                                updateContacts('name', e.target.value);
                            }}
                            disabled
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder={user.email}
                            // value={contact.email}
                            onChange={(e) =>
                                updateContacts('email', e.target.value)
                            }
                            disabled
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="streetAddress">Street Address</Label>
                        <Input
                            id="streetAddress"
                            type="text"
                            placeholder={user?.address?.street_address}
                            required
                            // value={contact.address.street_address}
                            onChange={(e) =>
                                updateContacts(
                                    'street_address',
                                    e.target.value,
                                    true
                                )
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                        <div className="grid gap-2">
                            <Label>Country</Label>
                            <CountrySelect
                                onChange={setCountryCode}
                                defaultValue={contact.address.countryCode}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>State</Label>
                            <RegionSelect
                                countryCode={contact.address.countryCode}
                                onChange={setRegion}
                                defaultValue={contact.address.state}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                placeholder={user?.address?.city}
                                required
                                value={contact.address.city}
                                onChange={(e) =>
                                    updateContacts('city', e.target.value, true)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="zipcode">ZipCode</Label>
                            <Input
                                id="zipcode"
                                type="number"
                                placeholder={user?.address?.zipCode}
                                required
                                value={contact.address.zipCode}
                                onChange={(e) =>
                                    updateContacts(
                                        'zipCode',
                                        e.target.value,
                                        true
                                    )
                                }
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Phone Number</Label>
                        <PhoneInput
                            placeholder={user?.phone_number}
                            onChange={setPhonenumber}
                            value={contact.phone_number}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={contact.checked}
                            id="terms"
                            onClick={() => {
                                updateContacts('checked', !contact.checked);
                            }}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Save Address in database
                        </label>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button
                    onClick={() => {
                        handleNext();
                        let data = {
                            name: user.name,
                            email: user.email,
                            countryCode: contact.address.countryCode,
                            update_address: contact.checked,
                            address: {
                                street_address: contact.address.street_address
                                    ? contact.address.street_address
                                    : user.address.street_address,
                                country: contact.address.countryCode
                                    ? lookup.byIso(contact.address.countryCode)
                                          ?.country
                                    : '',
                                state: contact.address.state
                                    ? contact.address.state
                                    : user.address.zipCode,
                                city: contact.address.city
                                    ? contact.address.city
                                    : user.address.city,
                                zipCode: contact.address.zipCode
                                    ? contact.address.zipCode
                                    : user.address.zipCode
                            },
                            phone_number: contact.phone_number
                                ? contact.phone_number
                                : user.phone_number
                        };

                        createNewState(data);
                    }}
                >
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
}
