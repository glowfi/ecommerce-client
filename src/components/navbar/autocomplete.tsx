'use client';

import { Badge } from '@/components/ui/badge';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@/components/ui/command';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from './hooks/useDebounce';
import { usesearchStore } from './store';

export function CommandDialogDemo({ open, setOpen }: any) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProducts = usesearchStore(
        (state: any) => state.searchProducts
    );
    const fetchProducts = usesearchStore((state: any) => state.fetchProducts);

    const debouncedTxt = useDebounce(searchTerm);

    // @ts-ignore
    useEffect(() => {
        fetchProducts(debouncedTxt);
    }, [debouncedTxt]);

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Input
                    placeholder="Type a command or search..."
                    value={searchTerm}
                    onChange={(e: any) => {
                        setSearchTerm((curr) => e.target.value);
                    }}
                    className="focus-visible:ring-0"
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            router.push(`/product/search/?q=${searchTerm}`);
                        }
                    }}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {searchedProducts?.map((p: any, idx: any) => {
                            return (
                                <div
                                    key={idx}
                                    className="hover:opacity-75 transition-all"
                                    onClick={() => {
                                        router.push(`/product/${p?.id}`);
                                        setOpen(false);
                                        setSearchTerm('');
                                    }}
                                >
                                    <CommandItem className="flex justify-between gap-6 m-6">
                                        <Image
                                            src={p?.coverImage?.[1]}
                                            width={100}
                                            height={100}
                                            alt="Not Found"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-lg font-semibold gap-6">
                                                <Badge>Brand</Badge>
                                                <span className="ml-3">
                                                    {p?.brand}
                                                </span>
                                            </p>
                                            <p className="text-lg font-semibold">
                                                <Badge>Title</Badge>
                                                <span className="ml-3">
                                                    {p?.title}
                                                </span>
                                            </p>
                                            <p className="text-lg font-semibold">
                                                <Badge>Category</Badge>
                                                <span className="ml-3">
                                                    {p?.category?.name}
                                                </span>
                                            </p>
                                            <p className="text-lg font-semibold">
                                                <Badge>Price</Badge>
                                                <span className="ml-3">
                                                    ${p?.price}
                                                </span>
                                            </p>
                                        </div>
                                    </CommandItem>
                                    <CommandSeparator />
                                </div>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
