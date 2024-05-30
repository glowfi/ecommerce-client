import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type cartStore = any;

export const usecartStore = create<cartStore>(
    persist(
        (set: any) => ({
            cart: []
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
