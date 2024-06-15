import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import lookup from 'country-code-lookup';
import { redirect } from 'next/navigation';
import { useuserStore } from '../auth/store';

type checkoutStore = any;

export const usecheckoutStore = create<checkoutStore>(
    persist(
        (set: any, get: any) => ({
            contact: {
                name: '',
                checked: false,
                email: '',
                address: {
                    street_address: '',
                    country: '',
                    countryCode: '',
                    state: '',
                    city: '',
                    zipCode: ''
                },
                phone_number: ''
            },
            step: 1,
            setStep: (step: any) => {
                set({ step });
            },
            payment: 'razorpay',
            amount: 0.0,
            updatePayment: (method: any) => {
                set({ payment: method });
            },
            setEmptyState: () => {
                let obj = {
                    contact: {
                        name: '',
                        email: '',
                        address: {
                            street_address: '',
                            country: '',
                            countryCode: '',
                            state: '',
                            city: '',
                            zipCode: ''
                        },
                        phone_number: ''
                    }
                };
                set({ contact: { ...obj.contact } });
            },
            createNewState: (state: any) => {
                let obj = { ...state };
                set({ contact: obj });
                const { contact } = get();
            },
            setCountryCode: (value: any) => {
                const { contact } = get();
                let newobj = { ...contact };

                newobj['address']['countryCode'] = value;
                newobj['address']['country'] = lookup.byIso(value)?.country;

                set({
                    contact: {
                        ...newobj
                    }
                });
            },
            setRegion: (value: any) => {
                const { contact } = get();
                let newobj = { ...contact };

                newobj['address']['state'] = value;
                set({
                    contact: {
                        ...newobj
                    }
                });
            },
            setPhonenumber: (value: any) => {
                const { contact } = get();
                set({ contact: { ...contact, phone_number: value } });
            },
            updateContacts: (key: any, value: any, isAddress = false) => {
                const { contact } = get();
                if (!isAddress) {
                    set({
                        contact: {
                            ...contact,
                            [key]: value
                        }
                    });
                } else {
                    contact.address[key] = value;
                    set({
                        contact: {
                            ...contact
                        }
                    });
                }
            },
            isAuth: async (userID: any, cartLength: any) => {
                if (!userID) {
                    redirect('/auth/login');
                } else if (cartLength == 0) {
                    redirect('/');
                }
            }
        }),
        {
            name: 'checkout-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
