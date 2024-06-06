import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type usecurrProdStore = any;

export const useusecurrProdStore = create<usecurrProdStore>(
    persist(
        (set: any, get: any) => ({
            prodID: null,
            currProd: {},
            comments: {},
            lastIdx: '',
            pageIdx: 0,
            hasMore: true,
            isloading: false
        }),
        {
            name: 'currentproduct-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
