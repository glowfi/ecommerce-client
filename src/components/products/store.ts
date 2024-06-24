import { SecureStorage } from '@/lib/utils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ProductsStore = any;

export const useProductsStore = create<ProductsStore>(
    persist(
        (set: any, get: any) => ({
            allProducts: [],
            pageIdx: 0,
            loading: false,
            hasMore: true,
            reset: () => {
                useProductsStore.setState({ allProducts: [] });
                useProductsStore.setState({ pageIdx: 0 });
                useProductsStore.setState({ loading: false });
                useProductsStore.setState({ hasMore: true });
            },
            paginate: (data: any) => {
                const { allProducts } = get();
                if (allProducts.length >= 0) {
                    let newData = [...allProducts, ...data].sort(
                        (a: any, b: any) =>
                            parseInt(
                                (
                                    ((100 - a?.discountPercent) / 100) *
                                    a?.price
                                ).toFixed(0)
                            ) -
                            parseInt(
                                (
                                    ((100 - b?.discountPercent) / 100) *
                                    b?.price
                                ).toFixed(0)
                            )
                    );

                    set((state: any) => ({
                        allProducts: [...newData]
                    }));
                } else {
                    set({ allProducts: data });
                }
            }
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() =>
                process.env.STAGE === 'local' ? localStorage : SecureStorage
            )
        }
    )
);
