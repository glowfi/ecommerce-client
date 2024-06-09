import { Search_AtlasDocument } from '@/gql/graphql';
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
                    const { data } = await getClient().query(
                        Search_AtlasDocument,
                        {
                            term: term
                        }
                    );

                    if (data?.getProductsBySearchTermAtlasSearch.data) {
                        set({
                            searchProducts: [
                                ...data?.getProductsBySearchTermAtlasSearch
                                    ?.data
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
