'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MequeryDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useuserStore } from '../auth/store';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { UserUpdate } from './userupdate';
import FileUpload from './FileUpload';

export interface Address {
    city: string;
    country: string;
    countryCode: string;
    state: string;
    streetAddress: string;
    zipCode: string;
}

export interface User {
    name: string;
    id: string;
    address: Address;
    email: string;
    profilePic: string;
    phoneNumber: string;
    dob: string;
}

const getData = async () => {
    const userId = useuserStore.getState().user.id;

    const data = await getClient().query(MequeryDocument, {
        userId
    });
    return data;
};

const MyDetails = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<User | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        setLoading(true);
        getData()
            .then((data) => {
                if (data?.data?.getUserById?.data) {
                    //@ts-ignore
                    setUserData(data?.data?.getUserById?.data);
                }
                //
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner name="user details" />;
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        {userData?.name}
                    </CardTitle>
                    <CardDescription>
                        {userData?.dob && `Date of Birth : ${userData?.dob}`}
                    </CardDescription>
                </div>
                <div className="ml-auto flex flex-col items-center justify-center gap-1">
                    {!loaded && <LoadingSpinner name="pic" />}
                    <Image
                        onLoad={() => setLoaded(true)}
                        // @ts-ignore
                        src={userData?.profilePic}
                        alt="Not found"
                        width={50}
                        height={50}
                        className="hover:opacity-75 transition-all"
                    />
                    {userData && userData?.id && (
                        <FileUpload userId={userData?.id} />
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Information</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd>{userData?.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">{userData?.email}</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                                <a href="tel:">{userData?.phoneNumber}</a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Shipping Address</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                                Street Address
                            </dt>
                            <dd>{userData?.address?.streetAddress}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">City</dt>
                            <dd>
                                <a href="mailto:">{userData?.address?.city}</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">State</dt>
                            <dd>
                                <a href="tel:">{userData?.address?.state}</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Country</dt>
                            <dd>
                                <a href="tel:">{userData?.address?.country}</a>
                            </dd>
                        </div>

                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">ZipCode</dt>
                            <dd>
                                <a href="tel:">{userData?.address?.zipCode}</a>
                            </dd>
                        </div>
                    </dl>
                </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 justify-between">
                <div className="text-xs text-muted-foreground">
                    Proud Member of {process.env.STORE_NAME}
                </div>
                {/* @ts-ignore */}
                {userData?.email && <UserUpdate userdetails={userData} />}
            </CardFooter>
        </Card>
    );
};

export default React.memo(MyDetails);
