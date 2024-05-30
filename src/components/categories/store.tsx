import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type categoryStore = any;

export const usecategoryStore = create<categoryStore>(
    persist(
        (set: any) => ({
            allCategories: []
        }),
        {
            name: 'categories-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
