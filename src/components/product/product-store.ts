import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type usecurrProdStore = any;

export const useusecurrProdStore = create<usecurrProdStore>(
    persist(
        (set: any, get: any) => ({
            prodID: null,
            currProd: {}
        }),
        {
            name: 'currentproduct-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
