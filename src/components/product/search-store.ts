import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type searchStore = any;

export const usesearchStore = create<searchStore>(
    persist(
        (set: any, get: any) => ({
            searchProducts: [],
            filteredProducts: [],
            pageIdx: 0,
            loading: false,
            hasMore: true,
            lastquery: '',
            lastToken: '',
            lastIdx: -1,
            paginate: (data: any) => {
                const { searchProducts } = get();
                if (searchProducts?.length > 0) {
                    set((state: any) => ({
                        searchProducts: [...searchProducts, ...data]
                    }));
                } else {
                    set({ searchProducts: data });
                }
            },
            reset: (query: string) => {
                set({ pageIdx: 0 });
                set({ hasMore: true });
                set({ searchProducts: [] });
                set({ currquery: query });
                set({ lastToken: '' });
                set({ lastIdx: -1 });
            },
            isEmpty: () => {
                const { filteredProducts } = get();
                return filteredProducts.length === 0;
            }
        }),
        {
            name: 'search-bar-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
