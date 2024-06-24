import { SecureStorage } from '@/lib/utils';
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
            lastIdx_order: -1,
            setLoading: (value: boolean) => {
                set((state: any) => ({ loading: value }));
            },
            reset_rev: () => {
                
                set((state: any) => ({ allReviews: {} }));
                set((state: any) => ({ pageIdx: 0 }));
                set((state: any) => ({ hasMore: true }));
                set((state: any) => ({ lastIdx_rev: {} }));
            },

            reset_order: () => {
                
                set((state: any) => ({ allOrders: {} }));
                set((state: any) => ({ pageIdx_order: 0 }));
                set((state: any) => ({ hasMore_order: true }));
                set((state: any) => ({ lastIdx_order: -1 }));

                // useuserinfo.setState({ allOrders: {} });
                // useuserinfo.setState({ pageIdx_order: 0 });
                // useuserinfo.setState({ hasMore_order: true });
                // useuserinfo.setState({ lastIdx_order: -1 });
            }
        }),
        {
            name: 'userinfo-storage',
            storage: createJSONStorage(() =>
                process.env.STAGE === 'local' ? localStorage : SecureStorage
            )
        }
    )
);
