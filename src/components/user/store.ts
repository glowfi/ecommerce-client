import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type userinfo = any;

export const useuserinfo = create<userinfo>(
    persist(
        (set: any, get: any) => ({
            allReviews: {},
            allOrders: {},
            loading: true,
            currIdx: 1,
            pageIdx: 0,
            pageIdx_order: 0,
            hasMore: true,
            hasMore_order: true,
            lastIdx_rev: -1,
            lastIdx_order: -1
        }),
        {
            name: 'userinfo-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
