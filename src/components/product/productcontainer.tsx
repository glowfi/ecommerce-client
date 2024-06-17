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
                //@ts-ignore
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
        <div className="flex min-h-screen w-full flex-col mt-6 mb-12">
            <div className="flex flex-col justify-center items-center gap-6">
                <ItemPrev currProduct={currProd} />
                <Itemcarousel currProduct={currProd} />
                <div className="flex justify-center items-center">
                    <ProductDetails currProduct={currProd} />
                </div>
            </div>
            <ImagePreview />
        </div>
    );
};

export default Productcontainer;
