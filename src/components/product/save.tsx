'use client';

import { useState, useMemo } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SearchedResults() {
    const products = [
        {
            id: 1,
            name: 'Beach Bliss Flip-Flops',
            description: 'Comfortable Footwear',
            price: 19.99,
            color: 'black',
            featured: true,
            date: '2023-12-01',
            category: 'Shoes',
            rating: 4.5
        },
        {
            id: 2,
            name: 'Sunset Shades Sunglasses',
            description: 'UV Protection Eyewear',
            price: 29.99,
            color: 'black',
            featured: true,
            date: '2022-06-01',
            category: 'Accessories',
            rating: 4.2
        },
        {
            id: 3,
            name: 'Cool Breeze Portable Fan',
            description: 'On-the-Go Cooling',
            price: 14.99,
            color: 'blue',
            date: '2021-06-01',
            category: 'Accessories',
            rating: 3.8
        },
        {
            id: 4,
            name: 'Summer Breeze T-Shirt',
            description: 'Lightweight Cotton Shirt',
            price: 24.99,
            color: 'red',
            date: '2024-06-01',
            category: 'Tops',
            rating: 4.7
        },
        {
            id: 5,
            name: 'Sunset Beach Shorts',
            description: 'Quick-Dry Swim Shorts',
            price: 34.99,
            color: 'blue',
            date: '2024-03-15',
            category: 'Shorts',
            rating: 4.1
        },
        {
            id: 6,
            name: 'Sunset Beach Pants',
            description: 'Lightweight Cotton Pants',
            price: 299.99,
            color: 'black',
            date: '2023-06-01',
            category: 'Pants',
            rating: 4.3
        },
        {
            id: 7,
            name: 'Sunset Beach Towel',
            description: 'Absorbent Cotton Towel',
            price: 19.99,
            color: 'red',
            date: '2023-09-13',
            category: 'Accessories',
            rating: 4.6
        }
    ];
    const [selectedFilters, setSelectedFilters] = useState({
        category: [],
        price: { min: 0, max: Infinity },
        rating: 0
    });
    const handleFilterChange = (type, value) => {
        if (type === 'category') {
            setSelectedFilters({
                ...selectedFilters,
                category: selectedFilters.category.includes(value)
                    ? selectedFilters.category.filter((item) => item !== value)
                    : [...selectedFilters.category, value]
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
            .filter((product) => {
                if (
                    selectedFilters.category.length > 0 &&
                    !selectedFilters.category.includes(product.category)
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
    }, [selectedFilters]);
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
                                    <Label className="flex items-center gap-2 font-normal">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    'category',
                                                    'Shoes'
                                                )
                                            }
                                        />
                                        Shoes
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    'category',
                                                    'Tops'
                                                )
                                            }
                                        />
                                        Tops & T-Shirts
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    'category',
                                                    'Shorts'
                                                )
                                            }
                                        />
                                        Shorts
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    'category',
                                                    'Pants'
                                                )
                                            }
                                        />
                                        Pants & Tights
                                    </Label>
                                    <Label className="flex items-center gap-2 font-normal">
                                        <Checkbox
                                            onCheckedChange={() =>
                                                handleFilterChange(
                                                    'category',
                                                    'Accessories'
                                                )
                                            }
                                        />
                                        Accessories & Equipment
                                    </Label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="price">
                            <AccordionTrigger className="text-base">
                                Price
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-4">
                                    <div />
                                    <div className="flex justify-between text-sm">
                                        <span>
                                            ${selectedFilters.price.min}
                                        </span>
                                        <span>
                                            ${selectedFilters.price.max}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        {/* <AccordionItem value="rating"> */}
                        {/*   <AccordionTrigger className="text-base">Rating</AccordionTrigger> */}
                        {/*   <AccordionContent> */}
                        {/*     <div className="grid gap-2"> */}
                        {/*       <Label className="flex items-center gap-2 font-normal"> */}
                        {/*         <RadioGroup */}
                        {/*           value={selectedFilters.rating} */}
                        {/*           onValueChange={(value) => handleFilterChange("rating", value)} */}
                        {/*         > */}
                        {/*           <RadioGroupItem value={0} /> */}
                        {/*           <span className="flex items-center gap-1"> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*           </span> */}
                        {/*         </RadioGroup> */}
                        {/*       </Label> */}
                        {/*       <Label className="flex items-center gap-2 font-normal"> */}
                        {/*         <RadioGroup */}
                        {/*           value={selectedFilters.rating} */}
                        {/*           onValueChange={(value) => handleFilterChange("rating", value)} */}
                        {/*         > */}
                        {/*           <RadioGroupItem value={4} /> */}
                        {/*           <span className="flex items-center gap-1"> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*           </span> */}
                        {/*         </RadioGroup> */}
                        {/*       </Label> */}
                        {/*       <Label className="flex items-center gap-2 font-normal"> */}
                        {/*         <RadioGroup */}
                        {/*           value={selectedFilters.rating} */}
                        {/*           onValueChange={(value) => handleFilterChange("rating", value)} */}
                        {/*         > */}
                        {/*           <RadioGroupItem value={3} /> */}
                        {/*           <span className="flex items-center gap-1"> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*           </span> */}
                        {/*         </RadioGroup> */}
                        {/*       </Label> */}
                        {/*       <Label className="flex items-center gap-2 font-normal"> */}
                        {/*         <RadioGroup */}
                        {/*           value={selectedFilters.rating} */}
                        {/*           onValueChange={(value) => handleFilterChange("rating", value)} */}
                        {/*         > */}
                        {/*           <RadioGroupItem value={2} /> */}
                        {/*           <span className="flex items-center gap-1"> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*           </span> */}
                        {/*         </RadioGroup> */}
                        {/*       </Label> */}
                        {/*       <Label className="flex items-center gap-2 font-normal"> */}
                        {/*         <RadioGroup */}
                        {/*           value={selectedFilters.rating} */}
                        {/*           onValueChange={(value) => handleFilterChange("rating", value)} */}
                        {/*         > */}
                        {/*           <RadioGroupItem value={1} /> */}
                        {/*           <span className="flex items-center gap-1"> */}
                        {/*             <StarIcon className="w-5 h-5 fill-primary" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*             <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" /> */}
                        {/*           </span> */}
                        {/*         </RadioGroup> */}
                        {/*       </Label> */}
                        {/*     </div> */}
                        {/*   </AccordionContent> */}
                        {/* </AccordionItem> */}
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
                    <ul className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8 justify-center items-center">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="relative group">
                                <Link
                                    href="#"
                                    className="absolute inset-0 z-10"
                                    prefetch={false}
                                >
                                    <span className="sr-only">View</span>
                                </Link>
                                <img
                                    src={
                                        'https://res.cloudinary.com/diwstgzd0/image/upload/f_auto,q_auto/v1/products/Miscellaneous/sliderpics/a7228718-3753-437f-892a-4b341974ea5c/cd62916a-afcf-485e-93c9-469c76d5786d.jpg'
                                    }
                                    alt="Cover image"
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                                />
                                <div className="flex-1 py-4">
                                    <h3 className="font-semibold tracking-tight">
                                        {product.name} ({product.color})
                                    </h3>
                                    <div className="flex items-center gap-1">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold">
                                        ${product.price}
                                    </h4>
                                    <Button size="sm" className="mt-2">
                                        Add to cart
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function StarIcon(props) {
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
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
