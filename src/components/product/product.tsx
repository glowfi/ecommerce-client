'use client';
import { usePathname } from 'next/navigation';
import { useProductsStore } from '../products/store';
import { ImagePreview } from './imagepreview';
import Itemcarousel from './itemcarousel';
import ItemPrev from './itempreview';
import ProductDetails from './productdetails';
import CommentSection from './commentsection';
import React from 'react';

const Product = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const allProds = useProductsStore((state: any) => state.allProducts);
    const currProduct = allProds?.filter((p: any) => p?.id == ID)[0];

    return (
        <>
            <div className="grid grid-cols-12 gap-6 m-6">
                <div className="col-span-7">
                    <ItemPrev currProduct={currProduct} />
                    <div className="flex justfy-center items-center gap-6 mt-6">
                        <Itemcarousel currProduct={currProduct} />
                    </div>
                </div>
                <div className="col-span-5">
                    <ProductDetails currProduct={currProduct} />
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
