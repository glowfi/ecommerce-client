'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SkeletonCard } from '../product/SkeletonCard';
import { Badge } from '../ui/badge';
import { useDebounce } from './hooks/useDebounce';
import { usesearchStore } from './store';
import LoadingSpinner from '../loadingspinners/loadingspinner';

export default function Autocomplete() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const searchedProducts = usesearchStore(
        (state: any) => state.searchProducts
    );
    const fetchProducts = usesearchStore((state: any) => state.fetchProducts);

    const [debouncedText, isloading, setIsloading] = useDebounce(searchTerm);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isopen, setIsopen] = useState(false);
    const reset = usesearchStore((state: any) => state.reset);
    const menuRef = useRef<any>(null);

    // Function to handle click outside the menu
    const handleClickOutside = (event) => {
        if (isopen && !menuRef?.current?.contains(event.target)) {
            setSearchTerm('');
            setIsopen(false);
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
        <div className="relative w-full max-w-md" ref={menuRef}>
            <div className="relative">
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
                    className="focus-visible:ring-0"
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            router.push(`/product/search/?q=${searchTerm}`);
                        }
                    }}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {isloading ? (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dark:bg-gray-950 ">
                    <LoadingSpinner name="results" />
                </div>
            ) : (
                <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dark:bg-gray-950 ">
                    <ul
                        className={`max-h-[300px] overflow-y-auto ${!isopen && 'hidden'}`}
                    >
                        {searchedProducts?.map((product: any) => (
                            <li
                                key={product.id}
                                className="flex items-center gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-primary-foreground hover:cursor-pointer"
                                onClick={() => {
                                    router.push(`/product/${product?.id}`);
                                    setSearchTerm('');
                                    setIsopen(false);
                                }}
                            >
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
                                    src={product?.coverImage?.[1]}
                                    alt="Not Found"
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />
                                <div className="flex-1">
                                    <h2 className="font-bold">
                                        {product.brand}
                                    </h2>
                                    <h3 className="font-medium">
                                        {product.title}
                                    </h3>
                                    <Badge>{product.categoryName}</Badge>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        ${product.price}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
