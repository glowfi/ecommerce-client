import { create } from 'zustand';
import { getClient } from '@/lib/graphqlserver';
import { GetallprodDocument } from '@/gql/graphql';
import { persist, createJSONStorage } from 'zustand/middleware';

type ProductsStore = any;

const getInitialState = async () => {
    const { data } = await getClient().query(GetallprodDocument, {});
    return data;
};

export const useProductsStore = create<ProductsStore>(
    persist(
        (set: any) => ({
            allProducts: null
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

getInitialState().then((data) => {
    useProductsStore.setState({
        allProducts: data?.getAllProducts?.data
    });
});
