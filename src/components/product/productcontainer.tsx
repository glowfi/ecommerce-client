'use client';

import { GetProductByIdDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { ImagePreview } from './imagepreview';
import Itemcarousel from './itemcarousel';
import { useusecurrProdStore } from './product-store';
import ItemPrev from './itempreview';
import ProductDetails from './productdetails';
import { usePathname } from 'next/navigation';

const loadData = async (productId: string) => {
    const lastIdx = useusecurrProdStore.getState().lastIdx;
    if (lastIdx == productId) {
        return;
    }

    const data = await getClient().query(GetProductByIdDocument, {
        productId
    });

    useusecurrProdStore.setState({
        prodID: productId
    });

    if (data?.data?.getProductById?.data) {
        useusecurrProdStore.setState({
            currProd: data?.data?.getProductById?.data
        });
    }
    return data;
};

const Productcontainer = () => {
    const pathname = usePathname();

    let ID = pathname.split('/').pop();

    const currProd = useusecurrProdStore((state: any) => state.currProd);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);
        loadData(ID as string)
            .then((data) => {
                if (data.data?.getProductById?.data) {
                    setFetching(false);
                }
            })
            .catch(() => {
                setFetching(false);
            });
    }, [ID]);

    if (fetching) {
        return <LoadingSpinner name={'product'} />;
    }

    return (
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
    );
};

export default Productcontainer;
