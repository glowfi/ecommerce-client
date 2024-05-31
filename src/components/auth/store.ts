import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type userStore = any;

export const useuserStore = create<userStore>(
    persist(
        (set: any) => ({
            user: { email: null, profile_pic: null, name: null },
            addUser: (newUser: any) => {
                set((state: any) => ({
                    user: {
                        email: newUser.email,
                        profile_pic: newUser.profile_pic,
                        name: newUser.name
                    }
                }));
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
