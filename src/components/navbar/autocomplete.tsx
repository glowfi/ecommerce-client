'use client';

import { Input } from '@/components/ui/input';
import { titleCase } from '@/lib/utils';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { SkeletonCard } from '../product/SkeletonCard';
import { Badge } from '../ui/badge';
import { useautoStore } from './autocompletestore';
import { useDebounce } from './hooks/useDebounce';

export default function Autocomplete() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProducts = useautoStore((state: any) => state.searchProducts);
    const fetchProducts = useautoStore((state: any) => state.fetchProducts);

    const [debouncedText, isloading, setIsloading] = useDebounce(searchTerm);
    const [isopen, setIsopen] = useState(false);
    const menuRef = useRef<any>(null);
    const [isimageloading, setIsimageloading] = useState(true);

    // Function to handle click outside the menu
    const handleClickOutside = (event: any) => {
        if (isopen && !menuRef?.current?.contains(event.target)) {
            setSearchTerm('');
            setIsopen(false);
            useautoStore.setState({ searchProducts: [] });
        }
    };

    useEffect(() => {
        // Add the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Remove the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isopen]);

    // @ts-ignore
    useEffect(() => {
        fetchProducts(debouncedText);
    }, [debouncedText]);

    return (
        <div className="relative w-full" ref={menuRef}>
            <div className="relative flex justify-center">
                <Input
                    placeholder="Type to start searching for products..."
                    value={searchTerm}
                    onClick={() => {
                        // reset();
                        setIsopen(true);
                    }}
                    onMouseDown={() => {
                        setIsopen(false);
                    }}
                    onChange={(e: any) => {
                        setSearchTerm((curr) => e.target.value);
                        //@ts-ignore
                        setIsloading(true);
                        setIsopen(true);
                    }}
                    className="focus-visible:ring-0 text-center"
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            router.push(`/product/search/?q=${searchTerm}`);
                            setIsopen(false);
                            setSearchTerm('');
                            useautoStore.setState({ searchProducts: [] });
                        }
                    }}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hidden md:block" />
            </div>

            {isloading ? (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dark:bg-primary-foreground">
                    <LoadingSpinner name="results" />
                </div>
            ) : (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dark:bg-primary-foreground">
                    <ul
                        className={`max-h-[300px] overflow-y-auto ${!isopen && 'hidden'} flex-col justify-center items-center`}
                    >
                        {searchedProducts?.map((product: any) => (
                            <li
                                key={product.id}
                                className="flex justify-center items-center gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-black hover:cursor-pointer"
                                onClick={() => {
                                    // router.push(`/product/${product?.id}`);
                                    useautoStore.setState({
                                        searchProducts: []
                                    });

                                    setSearchTerm('');
                                    setIsopen(false);
                                    router.push(`/product/${product.id}`);
                                }}
                            >
                                <div className="flex justify-between items-center gap-3">
                                    {isimageloading && (
                                        <SkeletonCard
                                            props={{
                                                w: '100',
                                                h: '100'
                                            }}
                                        />
                                    )}

                                    <Image
                                        onLoad={() => setIsimageloading(true)}
                                        src={product?.coverImage?.[1]}
                                        alt="Not Found"
                                        width={100}
                                        height={100}
                                        className={`
              duration-700 ease-in-out group-hover:opacity-75 rounded-md
              ${
                  isloading
                      ? 'scale-100 blur-xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
              })`}
                                    />
                                    <div className="flex justify-center items-center gap-6">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">
                                                {titleCase(product.brand)}
                                            </h3>
                                            <h3 className="font-medium">
                                                {titleCase(product.title)}
                                            </h3>
                                        </div>
                                        <h3 className="font-medium">
                                            <Badge>
                                                {product.categoryName.toLowerCase()}
                                            </Badge>
                                        </h3>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
