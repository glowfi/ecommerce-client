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
            paginate: (data: any) => {
                const { allProducts } = get();
                // console.log(allProducts);
                if (allProducts.length > 0) {
                    console.log('Triggred!', allProducts);
                    set((state: any) => ({
                        allProducts: [...allProducts, ...data]
                    }));
                } else {
                    set({ allProducts: data });
                }
            }
        }),
        {
            name: 'product-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
