import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type userStore = any;

export const useuserStore = create<userStore>(
    persist(
        (set: any) => ({
            user: { email: null },
            addUser: (newUser: any) => {
                console.log('Entered', newUser);
                set((state: any) => ({
                    user: { ...state.user, ...newUser }
                }));
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
