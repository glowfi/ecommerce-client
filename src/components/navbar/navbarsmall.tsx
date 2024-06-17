'use client';
import Logo from '@/app/icon.png';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useuserStore } from '../auth/store';
import { ModeToggle } from '../toggletheme/ThemeSwitcher';
import { Input } from '../ui/input';
import CartIcon from './CartIcon';
import { Autocompletesmall } from './autocompletesmall';
import { useautoStore } from './autocompletestore';
import { usePathname } from 'next/navigation';

export default function Navbarsmall() {
    const [open, setOpen] = useState(false);
    const currUser = useuserStore((state: any) => state.user);
    const userID = useuserStore((state: any) => state.user.id);
    const [issheetopen, setIssheetopen] = useState(false);
    const pathname = usePathname();

    return (
        <header
            className={`flex md:hidden justify-center items-center sticky z-50 top-0 h-16 border-b bg-background ${pathname.includes('auth') || pathname.includes('checkout') ? 'hidden' : ''}`}
        >
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <Image
                    src={Logo}
                    width={100}
                    height={100}
                    alt="Not Found"
                    className="h-10 w-14"
                />
                <span className="sr-only">Nimbus Store</span>
            </Link>
            <div className="flex md:hidden justify-center items-center w-fit">
                <Input
                    type="text"
                    id="text"
                    placeholder="Click to start searching for products ..."
                    className="text-center"
                    onClick={() => {
                        useautoStore.setState({ searchProducts: [] });
                        setOpen(!open);
                    }}
                />
                <Autocompletesmall open={open} setOpen={setOpen} />
            </div>

            <div className="flex justify-end gap-1 m-1">
                <CartIcon />
                <Sheet open={issheetopen} onOpenChange={setIssheetopen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIssheetopen(true)}
                        >
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">
                                Toggle navigation menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetClose asChild>Close</SheetClose>
                    <SheetContent side="right">
                        <div className="grid gap-4 p-4">
                            <Link
                                href="/"
                                className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                prefetch={false}
                                onClick={() => setIssheetopen(false)}
                            >
                                Home
                            </Link>
                            <div className="flex justify-start items-center gap-3">
                                <p>Change theme :</p>
                                <ModeToggle />
                            </div>
                            <div className="flex justify-start items-center">
                                {currUser?.email && (
                                    <div>
                                        {currUser?.profile_pic ? (
                                            <div className="flex justify-center items-center gap-6">
                                                <Image
                                                    src={currUser.profile_pic}
                                                    alt="Not Found"
                                                    width={50}
                                                    height={50}
                                                    className="hover:opacity-75 transition-all"
                                                />
                                                {currUser?.name}
                                            </div>
                                        ) : (
                                            <p className="leading-7 [&:not(:first-child)]:mt-6">
                                                {currUser?.name}
                                            </p>
                                        )}
                                        <div className="flex flex-col gap-3 m-2">
                                            <Link
                                                href={`/user/${userID}`}
                                                className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                                prefetch={false}
                                                onClick={() =>
                                                    setIssheetopen(false)
                                                }
                                            >
                                                Account Settings
                                            </Link>
                                            <Link
                                                href="/auth/logout"
                                                className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50 text-red-600"
                                                prefetch={false}
                                                onClick={() =>
                                                    setIssheetopen(false)
                                                }
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
