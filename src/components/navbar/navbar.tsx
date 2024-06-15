'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AvatarFallback } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useuserStore } from '../auth/store';
import { ModeToggle } from '../toggletheme/ThemeSwitcher';
import CartIcon from './CartIcon';
import Autocomplete from './autocomplete';
import { useTheme } from 'next-themes';
import Logo from '@/app/icon.png';

const Navbar = () => {
    const pathname = usePathname();
    const currUser = useuserStore((state: any) => state.user);
    const userID = useuserStore((state: any) => state.user.id);
    const router = useRouter();
    const [hasHydrated, setHasHydrated] = useState(false);

    // console.log(useTheme());
    const { theme } = useTheme();
    useEffect(() => {
        setHasHydrated(!hasHydrated);
    }, [theme]);

    return (
        <>
            <header
                className={`sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 ${pathname.includes('auth') || pathname.includes('checkout') ? 'hidden' : ''}`}
            >
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center text-lg font-semibold md:text-base hover:opacity-75 transition-all"
                    >
                        <div className="flex gap-1 justify-between items-center">
                            <Image
                                src={Logo}
                                width={100}
                                height={100}
                                alt="Not Found"
                                className="h-10 w-14"
                            />

                            <p
                                onClick={() => {
                                    router.push('/');
                                }}
                            >
                                {/* {process?.env?.STORE_NAME && */}
                                {/*     process.env.STORE_NAME.split(' ')[0]} */}
                                {process?.env?.STORE_NAME}
                            </p>
                        </div>
                    </Link>
                </nav>
                <div className="flex justify-center items-center w-full gap-1.5">
                    <Autocomplete />
                </div>

                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex flex-1 sm:flex-initial gap-3">
                        {!currUser.email && (
                            <Button asChild variant={'secondary'}>
                                <Link href="/auth/login">Login</Link>
                            </Button>
                        )}
                        <ModeToggle />
                        <div className="flex">
                            <CartIcon />
                        </div>
                        {currUser?.email && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        {currUser?.profile_pic ? (
                                            <Image
                                                src={currUser.profile_pic}
                                                alt="Not Found"
                                                width={100}
                                                height={100}
                                                className="hover:opacity-75 transition-all"
                                            />
                                        ) : (
                                            <AvatarFallback>CN</AvatarFallback>
                                        )}
                                        <span className="sr-only">
                                            Toggle user menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {currUser.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            router.push(`/user/${userID}`);
                                        }}
                                    >
                                        Account Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            router.push('/cart');
                                        }}
                                    >
                                        Cart
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            router.push('/auth/logout');
                                        }}
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default React.memo(Navbar);
