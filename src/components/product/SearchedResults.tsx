'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search_AtlasDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { useRouter, useSearchParams } from 'next/navigation';
import { usecategoryStore } from '../categories/store';
import ProductCard from '../products/ProductCard';
import { LoadingButton } from '../ui/loading-button';
import { MAX_PRICE, MIN_PRICE, TOTAL_ITEMS } from './constants';
import { usesearchStore } from './search-store';
import { Priceslider } from './priceslider';
import { useautoStore } from '../navbar/autocompletestore';
import { StarIcon } from '../ui/staricon';

async function fetchProducts(query: string) {
    console.log('Entred!');
    const lastquery = usesearchStore.getState().lastquery;
    const reset = usesearchStore.getState().reset;

    if (lastquery !== query) {
        reset(query);
    }

    const lastIdx = usesearchStore.getState().lastIdx;
    const page = usesearchStore.getState().pageIdx;
    const paginate = usesearchStore.getState().paginate;
    const lastToken = usesearchStore.getState().lastToken;

    if (lastIdx !== -1 && lastIdx === page) {
        console.log('Reset');
        return;
    }

    // if query first titme
    if (!lastquery && lastIdx === -1) {
        usesearchStore.setState({ lastquery: query });
        usesearchStore.setState({ lastIdx: page });
    }

    if (lastIdx !== page) {
        usesearchStore.setState({ lastquery: query });
        usesearchStore.setState({ lastIdx: page });
    }

    usesearchStore.setState({ loading: true });

    const { data } = await getClient().query(
        Search_AtlasDocument,
        {
            term: query as string,
            limit: TOTAL_ITEMS,
            lastTokensaved: lastToken
        },
        { requestPolicy: 'network-only' }
    );

    let currData = data?.getProductsBySearchTermAtlasSearch?.data;
    console.log('Any Data', currData);

    if (currData) {
        console.log(currData);
        paginate(currData);
        // usesearchStore.setState({ pageIdx: page + 1 });
        usesearchStore.setState({
            lastToken: data?.getProductsBySearchTermAtlasSearch?.lastToken
        });

        let filteredProducts = usesearchStore.getState().filteredProducts;
        // if (lastquery !== query) {
        //     usesearchStore.setState({ filteredProducts: currData });
        // } else {
        //     usesearchStore.setState({
        //         filteredProducts: [...filteredProducts, ...currData]
        //     });
        // }

        // console.log(currData, 'NOw');
        if (currData.length < TOTAL_ITEMS) {
            usesearchStore.setState({ hasMore: false });
        }
    }
    usesearchStore.setState({ loading: false });
    return currData;
}

export default function SearchedResults() {
    const products = usesearchStore((state: any) => state.searchProducts);
    const router = useRouter();

    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    if (!query) {
        router.push('/');
    }

    const page = usesearchStore((state: any) => state.pageIdx);
    const bottom = useRef(null);
    const loading = usesearchStore((state: any) => state.loading);
    const hasMore = usesearchStore((state: any) => state.hasMore);
    const allCat = usecategoryStore((state: any) => state.allCategories);
    const lastquery = usesearchStore((state: any) => state.lastquery);
    const isEmpty = usesearchStore((state: any) => state.isEmpty);
    // const filteredProducts = usesearchStore(
    //     (state: any) => state.filteredProducts
    // );

    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        price: { min: MIN_PRICE, max: MAX_PRICE },
        rating: 0
    });
    const handleFilterChange = (type, value) => {
        if (type === 'category') {
            console.log(selectedFilters);
            setSelectedFilters({
                ...selectedFilters,
                category: selectedFilters?.category?.includes(value)
                    ? selectedFilters?.category?.filter(
                          (item) => item !== value
                      )
                    : [...selectedFilters?.category, value]
            });
            // usesearchStore.setState({
            //     filteredProducts: getData()
            // });
        } else if (type === 'price') {
            setSelectedFilters({
                ...selectedFilters,
                price: value
            });
            // usesearchStore.setState({
            //     filteredProducts: getData()
            // });
        } else if (type === 'rating') {
            setSelectedFilters({
                ...selectedFilters,
                rating: value
            });
            // usesearchStore.setState({
            //     filteredProducts: getData()
            // });
        }
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                if (
                    selectedFilters.category.length > 0 &&
                    !selectedFilters.category.includes(product.categoryName)
                ) {
                    return false;
                }
                if (
                    product.price < selectedFilters.price.min ||
                    product.price > selectedFilters.price.max
                ) {
                    return false;
                }
                if (product.rating < selectedFilters.rating) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => b.rating - a.rating);
    }, [selectedFilters, products, page, query]);

    // const getData = useCallback(() => {
    //     return filteredProducts
    //         .filter((product) => {
    //             if (
    //                 selectedFilters.category.length > 0 &&
    //                 !selectedFilters.category.includes(product.category)
    //             ) {
    //                 return false;
    //             }
    //             if (
    //                 product.price < selectedFilters.price.min ||
    //                 product.price > selectedFilters.price.max
    //             ) {
    //                 return false;
    //             }
    //             if (product.rating < selectedFilters.rating) {
    //                 return false;
    //             }
    //             return true;
    //         })
    //         .sort((a, b) => b.rating - a.rating);
    // }, [selectedFilters, products, filteredProducts, query]);

    // useEffect(() => {
    //     let val = getData();
    //     if (isEmpty()) {
    //         usesearchStore.setState({
    //             filteredProducts: val
    //         });
    //     }
    // }, []);

    useEffect(() => {
        fetchProducts(query as string);
    }, [page, query]);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         if (entries[0].isIntersecting) {
    //             usesearchStore.setState({ pageIdx: page + 1 });
    //         }
    //     });
    //     observer.observe(bottom.current);
    // }, []);

    return (
        <section>
            <div className="container px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start">
                <div className="flex flex-col gap-4 items-start py-2">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="category">
                            <AccordionTrigger className="text-base">
                                Category
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-2">
                                    {allCat.map(({ name, id }: any) => {
                                        return (
                                            <Label
                                                className="flex items-center gap-2 font-normal"
                                                key={id}
                                            >
                                                <Checkbox
                                                    onCheckedChange={() =>
                                                        handleFilterChange(
                                                            'category',
                                                            `${name}`
                                                        )
                                                    }
                                                />
                                                {name}
                                            </Label>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="price">
                            <AccordionTrigger className="text-base">
                                Price
                            </AccordionTrigger>
                            <AccordionContent>
                                <Priceslider
                                    props={{
                                        ...selectedFilters.price,
                                        selectedFilters,
                                        setSelectedFilters
                                    }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="rating">
                            <AccordionTrigger className="text-base">
                                Rating
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2 font-normal">
                                        <RadioGroup
                                            value={selectedFilters.rating}
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    'rating',
                                                    value
                                                )
                                            }
                                        >
                                            <RadioGroupItem value={5} />
                                            <span className="flex items-center gap-1">
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                            </span>
                                        </RadioGroup>
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <RadioGroup
                                            value={selectedFilters.rating}
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    'rating',
                                                    value
                                                )
                                            }
                                        >
                                            <RadioGroupItem value={4} />
                                            <span className="flex items-center gap-1">
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                            </span>
                                        </RadioGroup>
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <RadioGroup
                                            value={selectedFilters.rating}
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    'rating',
                                                    value
                                                )
                                            }
                                        >
                                            <RadioGroupItem value={3} />
                                            <span className="flex items-center gap-1">
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                            </span>
                                        </RadioGroup>
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <RadioGroup
                                            value={selectedFilters.rating}
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    'rating',
                                                    value
                                                )
                                            }
                                        >
                                            <RadioGroupItem value={2} />
                                            <span className="flex items-center gap-1">
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                            </span>
                                        </RadioGroup>
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <RadioGroup
                                            value={selectedFilters.rating}
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    'rating',
                                                    value
                                                )
                                            }
                                        >
                                            <RadioGroupItem value={1} />
                                            <span className="flex items-center gap-1">
                                                <StarIcon className="w-5 h-5 fill-primary" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                            </span>
                                        </RadioGroup>
                                    </Label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="grid gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Summer Collection
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Hot Picks from the Summer Collection: Embrace
                                the Season in Style!
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 justify-center items-center">
                        {filteredProducts?.map((product: any, idx: any) => (
                            <div className="flex gap-6" key={idx}>
                                <ProductCard currProduct={product} />
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="flex justify-center items-center">
                            <LoadingButton
                                loading={loading}
                                className="w-fit"
                                onClick={() => {
                                    usesearchStore.setState({
                                        pageIdx: page + 1
                                    });
                                    console.log('clicked!');
                                }}
                            >
                                Load more
                            </LoadingButton>
                        </div>
                    )}
                    <div ref={bottom} />
                </div>
            </div>
        </section>
    );
}
