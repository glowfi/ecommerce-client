import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type userStore = any;

export const useuserStore = create<userStore>(
    persist(
        (set: any) => ({
            user: {
                email: null,
                profile_pic: null,
                name: null,
                id: null,
                address: null,
                phone_number: null
            },
            addUser: (newUser: any) => {
                set((state: any) => ({
                    user: {
                        email: newUser.email,
                        profile_pic: newUser.profile_pic,
                        name: newUser.name,
                        id: newUser.id,
                        address: newUser.address,
                        phone_number: newUser.phone_number
                    }
                }));
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
