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
            reset_rev: () => {
                useuserinfo.setState({ pageIdx: 0 });
                useuserinfo.setState({ hasMore: true });
                useuserinfo.setState({ lastIdx_rev: -1 });
            },

            reset_order: () => {
                useuserinfo.setState({ pageIdx_order: 0 });
                useuserinfo.setState({ hasMore_order: true });
                useuserinfo.setState({ lastIdx_order: -1 });
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
