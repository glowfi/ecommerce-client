'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CategoriesDocument, Search_AtlasDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usecategoryStore } from '../categories/store';
import ProductCard from '../products/ProductCard';
import { LoadingButton } from '../ui/loading-button';
import { StarIcon } from '../ui/staricon';
import { MAX_PRICE, MIN_PRICE, TOTAL_ITEMS } from './constants';
import { Priceslider } from './priceslider';
import { usesearchStore } from './search-store';

const loadCategories = async () => {
    const allCat = usecategoryStore.getState().allCategories;

    if (allCat.length === 0) {
        const data = await getClient().query(CategoriesDocument, {});

        if (data?.data?.getAllCategories?.data) {
            usecategoryStore.setState({
                allCategories: data?.data?.getAllCategories?.data
            });
        }
        return data;
    }
    return null;
};

async function fetchProducts(query: string) {
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

    if (currData) {
        paginate(currData);
        usesearchStore.setState({
            lastToken: data?.getProductsBySearchTermAtlasSearch?.lastToken
        });

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

    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        price: { min: MIN_PRICE, max: MAX_PRICE },
        rating: 0
    });
    const handleFilterChange = (type: any, value: any) => {
        if (type === 'category') {
            setSelectedFilters({
                ...selectedFilters,
                //@ts-ignore
                category: selectedFilters?.category?.includes(value)
                    ? selectedFilters?.category?.filter(
                          (item) => item !== value
                      )
                    : [...selectedFilters?.category, value]
            });
        } else if (type === 'price') {
            setSelectedFilters({
                ...selectedFilters,
                price: value
            });
        } else if (type === 'rating') {
            setSelectedFilters({
                ...selectedFilters,
                rating: value
            });
        }
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product: any) => {
                if (
                    selectedFilters?.category?.length > 0 &&
                    //@ts-ignore
                    !selectedFilters?.category?.includes(product?.categoryName)
                ) {
                    return false;
                }
                if (
                    parseInt(
                        (
                            ((100 - product?.discountPercent) / 100) *
                            product?.price
                        ).toFixed(0)
                    ) < selectedFilters.price.min ||
                    parseFloat(
                        (
                            ((100 - product?.discountPercent) / 100) *
                            product?.price
                        ).toFixed(0)
                    ) > selectedFilters.price.max
                ) {
                    return false;
                }
                if (product.rating < selectedFilters.rating) {
                    return false;
                }
                return true;
            })
            .sort(
                (a: any, b: any) =>
                    parseInt(
                        (((100 - a?.discountPercent) / 100) * a?.price).toFixed(
                            0
                        )
                    ) -
                    parseInt(
                        (((100 - b?.discountPercent) / 100) * b?.price).toFixed(
                            0
                        )
                    )
            );
    }, [selectedFilters, products, page, query]);

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        fetchProducts(query as string);
    }, [page, query]);

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
                                                    //@ts-ignore
                                                    checked={selectedFilters?.category?.includes(
                                                        //@ts-ignore
                                                        name
                                                    )}
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
                                    // @ts-ignore
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
                            <AccordionContent className="w-full">
                                <div className="flex flex-col gap-2">
                                    {[1, 2, 3, 4, 5].map((p, idx) => {
                                        return (
                                            <Label
                                                className="flex gap-2 font-normal"
                                                key={idx}
                                            >
                                                <RadioGroup
                                                    className="flex"
                                                    // @ts-ignore
                                                    value={
                                                        selectedFilters.rating
                                                    }
                                                    onValueChange={(value) =>
                                                        handleFilterChange(
                                                            'rating',
                                                            value
                                                        )
                                                    }
                                                >
                                                    {/* @ts-ignore */}
                                                    <RadioGroupItem value={p} />
                                                    <span className="flex justify-center items-center gap-1">
                                                        {p}{' '}
                                                        <StarIcon className="w-5 h-5 fill-primary" />
                                                    </span>
                                                </RadioGroup>
                                            </Label>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="grid gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">
                                Search Results
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Showing search results for {query}
                            </p>
                        </div>
                    </div>
                    {filteredProducts.length === 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 justify-center items-center">
                            <h4 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0 text-center">
                                No matching products found!
                            </h4>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 justify-center items-center">
                                {filteredProducts?.map(
                                    (product: any, idx: any) => (
                                        <div key={idx}>
                                            <ProductCard product={product} />
                                        </div>
                                    )
                                )}
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
                                        }}
                                    >
                                        Load more
                                    </LoadingButton>
                                </div>
                            )}
                            <div ref={bottom} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
