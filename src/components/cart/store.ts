import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type cartStore = any;

export const usecartStore = create<cartStore>(
    persist(
        (set: any, get: any) => ({
            cart: [],
            amount: 0,
            increaseCart: (id: string, product: any) => {
                const { cart } = get();
                let found = false;
                let isOverStockLimit = false;
                for (let index = 0; index < cart.length; index++) {
                    let currProduct = cart[index];

                    if (currProduct['id'] == id) {
                        found = true;
                        //Check if within stock amount
                        if (
                            currProduct['quantity'] + 1 >
                            currProduct['stock']
                        ) {
                            isOverStockLimit = true;
                        } else {
                            currProduct['quantity'] += 1;
                            set((state: any) => ({
                                amount: state.amount + currProduct['price']
                            }));
                            set({ cart: [...cart] });
                        }
                    }
                }
                if (!found) {
                    const { cart } = get();
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                    set((state: any) => ({
                        amount: state.amount + product.price
                    }));
                }
                if (isOverStockLimit) {
                    return 'limit';
                }
            },
            decreaseCart: (id: string) => {
                const { cart } = get();
                for (let index = 0; index < cart.length; index++) {
                    let currProduct = cart[index];

                    if (currProduct['id'] == id) {
                        //Check if equal to zero
                        if (currProduct['quantity'] - 1 === 0) {
                            const { removeCart } = get();
                            removeCart(currProduct['id']);
                        } else {
                            currProduct['quantity'] -= 1;
                            set({ cart: [...cart] });
                        }
                        set((state: any) => ({
                            amount: state.amount - currProduct['price']
                        }));
                    }
                }
            },
            removeCart: (id: string) => {
                const { cart } = get();
                let newCart = cart.filter((p: any) => p.id != id);
                set({
                    cart: [...newCart]
                });
            },
            updateCart: () => {
                const { cart } = get();
                set({ cart });
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
