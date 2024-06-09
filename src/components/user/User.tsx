'use client';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import Myaccount from './myaccount';
import MyDetails from './mydetails';
import MyReviews from './myreviews';
import { checkIsAuth } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';
import { Myorders } from './myorders';
import { useuserinfo } from './store';

export function User() {
    const idx = useuserinfo((state: any) => state.currIdx);
    // const [idx, setIdx] = useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        const data = checkIsAuth();
        if (data === 'auth') {
            toast({
                variant: 'destructive',
                title: 'Authentication!',
                description: 'Login to view user!'
            });
            router.push('/auth/login');
        }
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground"
                        x-chunk="dashboard-04-chunk-0"
                    >
                        <Link
                            href="#"
                            className={
                                idx == 1
                                    ? `text-primary font-semibold`
                                    : `text-primary`
                            }
                            onClick={() => useuserinfo.setState({ currIdx: 1 })}
                        >
                            Personal Information
                        </Link>
                        <Link
                            className={
                                idx == 2
                                    ? `text-primary font-semibold`
                                    : `text-primary`
                            }
                            onClick={() => useuserinfo.setState({ currIdx: 2 })}
                            href=""
                        >
                            Orders
                        </Link>
                        <Link
                            className={
                                idx == 3
                                    ? `text-primary font-semibold`
                                    : `text-primary`
                            }
                            onClick={() => useuserinfo.setState({ currIdx: 3 })}
                            href=""
                        >
                            Reviews
                        </Link>
                        <Link
                            className={
                                idx == 4
                                    ? `text-primary font-semibold`
                                    : `text-primary`
                            }
                            onClick={() => useuserinfo.setState({ currIdx: 4 })}
                            href=""
                        >
                            Account
                        </Link>
                    </nav>

                    {idx == 1 && <MyDetails />}

                    {idx == 2 && <Myorders />}

                    {idx == 3 && <MyReviews />}

                    {idx == 4 && <Myaccount />}
                </div>
            </main>
        </div>
    );
}
