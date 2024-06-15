'use client';

import { Input } from '@/components/ui/input';
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
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isopen, setIsopen] = useState(false);
    const menuRef = useRef<any>(null);

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
                        className={`max-h-[300px] overflow-y-auto ${!isopen && 'hidden'}`}
                    >
                        {searchedProducts?.map((product: any) => (
                            <li
                                key={product.id}
                                className="flex items-center gap-4 border-b border-gray-200 px-4 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-black hover:cursor-pointer"
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
                                <div className="flex gap-3 justify-around">
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

                                    <h3 className="font-medium">
                                        {product.title.toLowerCase()}
                                    </h3>
                                    <h3 className="font-medium">
                                        <Badge>
                                            {product.categoryName.toLowerCase()}
                                        </Badge>
                                    </h3>
                                </div>
                                {/* <div className="flex-1"> */}
                                {/*     <h2 className="font-bold"> */}
                                {/*         {product.brand} */}
                                {/*     </h2> */}
                                {/*     <Badge>{product.categoryName}</Badge> */}

                                {/*     <p className="text-sm text-gray-500 dark:text-gray-400"> */}
                                {/*         ${product.price} */}
                                {/*     </p> */}
                                {/* </div> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
