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
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from './hooks/useDebounce';
import { usesearchStore } from './store';
import { SkeletonCard } from '../product/SkeletonCard';

export function CommandDialogDemo({ open, setOpen }: any) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProducts = usesearchStore(
        (state: any) => state.searchProducts
    );
    const fetchProducts = usesearchStore((state: any) => state.fetchProducts);

    const [debouncedText, isloading, setIsloading] = useDebounce(searchTerm);
    const [loaded, setLoaded] = useState<boolean>(false);

    // @ts-ignore
    useEffect(() => {
        fetchProducts(debouncedText);
    }, [debouncedText]);

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Input
                    placeholder="Type a command or search..."
                    value={searchTerm}
                    onChange={(e: any) => {
                        setSearchTerm((curr) => e.target.value);
                        //@ts-ignore
                        setIsloading(true);
                    }}
                    className="focus-visible:ring-0"
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            router.push(`/product/search/?q=${searchTerm}`);
                        }
                    }}
                />
                {isloading ? (
                    <h1 className="font-semibold text-center">Loading ...</h1>
                ) : (
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
                                            {!loaded && (
                                                <SkeletonCard
                                                    props={{
                                                        w: '100',
                                                        h: '100'
                                                    }}
                                                />
                                            )}

                                            <Image
                                                onLoad={() => setLoaded(true)}
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
                                                        {p?.categoryName}
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
                )}
            </CommandDialog>
        </>
    );
}
