import { SbytermDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type searchStore = any;

export const usesearchStore = create<searchStore>(
    persist(
        (set: any, get: any) => ({
            searchProducts: [],
            pageIdx: 0,
            loading: false,
            hasMore: true,
            query: '',
            oldquery: '',
            paginate: (data: any) => {
                const { searchProducts } = get();
                if (searchProducts.length > 0) {
                    set((state: any) => ({
                        searchProducts: [...searchProducts, ...data]
                    }));
                } else {
                    set({ searchProducts: data });
                }
            },
            reset: () => {
                set({ searchProducts: [] });
            },
            fetchProducts: async (term: any) => {
                if (term) {
                    const { data } = await getClient().query(SbytermDocument, {
                        term: term
                    });
                    console.log(data?.getProductsBySearchTerm.data);
                    if (data?.getProductsBySearchTerm.data) {
                        set({
                            searchProducts: [
                                ...data?.getProductsBySearchTerm?.data
                            ]
                        });
                    }
                }
            }
        }),
        {
            name: 'search-bar-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
