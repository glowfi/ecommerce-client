'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useProductsStore } from '../products/store';
import CommentSection from './commentsection';
import { ImagePreview } from './imagepreview';
import Itemcarousel from './itemcarousel';
import ItemPrev from './itempreview';
import ProductDetails from './productdetails';

const Product = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const allProds = useProductsStore((state: any) => state.allProducts);
    const currProduct = allProds?.filter((p: any) => p?.id == ID)[0];

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                        <div className="grid auto-rows-max gap-4 md:gap-8 lg:col-span-2 justify-center items-center">
                            <div className="col-span-6">
                                <ItemPrev currProduct={currProduct} />
                                <div className="flex justfy-center items-center gap-6 mt-6">
                                    <Itemcarousel currProduct={currProduct} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ProductDetails currProduct={currProduct} />
                        </div>
                    </main>
                </div>
                <ImagePreview />
            </div>
            <div className="container">
                <CommentSection />
            </div>
        </>
    );
};

export default React.memo(Product);
