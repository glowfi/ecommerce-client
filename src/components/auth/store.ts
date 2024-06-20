import CryptoJS from 'crypto-js';
import { create } from 'zustand';
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware';

type userStore = any;

export const SecureStorage: StateStorage = {
    getItem: async (key: string): Promise<string | null> => {
        const value = localStorage.getItem(key);

        if (value) {
            const decryptedBytes = CryptoJS.AES.decrypt(
                value,
                process.env.STORE_NONCE as string
            );
            const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedValue;
        }

        return value;
    },
    setItem: async (key: string, value: any): Promise<void> => {
        const encrypted = CryptoJS.AES.encrypt(
            value,
            process.env.STORE_NONCE as string
        ).toString();
        localStorage.setItem(key, encrypted);
    },
    removeItem: async (key: string): Promise<void> => {
        localStorage.removeItem(key);
    }
};

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
            isinit: false,
            isloggedinwithgoogle: false,
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
            storage: createJSONStorage(() =>
                process.env.STAGE === 'local' ? localStorage : SecureStorage
            )
        }
    )
);
