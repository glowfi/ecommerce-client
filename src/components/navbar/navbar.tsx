'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CircleUser, Store } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useuserStore } from '../auth/store';
import { ModeToggle } from '../toggletheme/ThemeSwitcher';
import { Input } from '../ui/input';
import { CommandDialogDemo } from './autocomplete';
import Cart from '../cart/cart';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const currUser = useuserStore((state: any) => state.user);

    return (
        <>
            <header
                className={`sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 ${pathname.includes('auth') ? 'hidden' : ''}`}
            >
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Store className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        <span>Estore</span>
                    </Link>
                </nav>
                <div className="flex justify-center items-center w-full gap-1.5">
                    <Input
                        type="text"
                        id="text"
                        placeholder="Click to start searching for products ..."
                        className="text-center"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    />
                    <CommandDialogDemo open={open} setOpen={setOpen} />
                </div>

                <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex flex-1 sm:flex-initial gap-3">
                        {!currUser.email && (
                            <Button asChild variant={'secondary'}>
                                <Link href="/auth/login">Login</Link>
                            </Button>
                        )}
                        <ModeToggle />
                        <Cart />
                        {currUser.email && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle user menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {currUser.email}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Orders</DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            useuserStore.setState({
                                                user: { email: null }
                                            });
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
