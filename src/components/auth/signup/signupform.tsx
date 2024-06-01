'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import CountrySelect from '@/components/ui/country-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import RegionSelect from '@/components/ui/region-select';
import { useToast } from '@/components/ui/use-toast';
import { SignupDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import lookup from 'country-code-lookup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SignUpForm() {
    const [countryCode, setCountryCode] = useState('');
    const [region, setRegion] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [dob, setDob] = useState('');
    const [, execSignup] = useMutation(SignupDocument);
    const { toast } = useToast();
    const router = useRouter();

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4"></div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Country (Optional)</Label>
                        <CountrySelect onChange={setCountryCode} />
                    </div>
                    <div className="grid gap-2">
                        <Label>State (Optional)</Label>
                        <RegionSelect
                            countryCode={countryCode}
                            onChange={setRegion}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Phone Number (Optional)</Label>
                        <PhoneInput
                            placeholder="Enter a phone number"
                            onChange={setPhonenumber}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Date of Birth (Optional)</Label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={async () => {
                            let data = await execSignup({
                                data: {
                                    name,
                                    email,
                                    password,
                                    address: {
                                        country: countryCode
                                            ? lookup.byIso(countryCode)?.country
                                            : '',
                                        state: region
                                    },
                                    phoneNumber: phonenumber,
                                    dob
                                }
                            });
                            toast({
                                title: 'Info!',
                                description:
                                    'Check your email for account confirmation link!'
                            });
                            router.push('/auth/login');
                        }}
                    >
                        Create an account
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm flex flex-col gap-3">
                    <Link href="/auth/login" className="underline">
                        Already have an account ? Sign in
                    </Link>
                    <Link href={'/'}>Go Back to Home</Link>
                </div>
            </CardContent>
        </Card>
    );
}
