'use client';
import { GetProductByIdDocument } from '@/gql/graphql';
import { useQuery } from '@urql/next';
import { usePathname } from 'next/navigation';
import React from 'react';
import CommentSection from './commentsection';
import { ImagePreview } from './imagepreview';
import Itemcarousel from './itemcarousel';
import ItemPrev from './itempreview';
import { useusecurrProdStore } from './product-store';
import ProductDetails from './productdetails';

const Product = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const currProd = useusecurrProdStore((state: any) => state.currProd);
    const prodID = useusecurrProdStore((state: any) => state.prodID);

    useusecurrProdStore.setState({
        prodID: ID
    });

    const [result, reexecuteQuery] = useQuery({
        query: GetProductByIdDocument,
        variables: { productId: ID as string }
    });
    const { data, fetching, error } = result;

    if (fetching) {
        return <h1>Loading ....</h1>;
    }

    if (data?.getProductById?.data) {
        useusecurrProdStore.setState({
            currProd: data?.getProductById?.data
        });
    }

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                        <div className="grid auto-rows-max gap-4 md:gap-8 lg:col-span-2 justify-center items-center">
                            <div className="col-span-6">
                                <ItemPrev currProduct={currProd} />
                                <div className="flex justfy-center items-center gap-6 mt-6">
                                    <Itemcarousel currProduct={currProd} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ProductDetails currProduct={currProd} />
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
