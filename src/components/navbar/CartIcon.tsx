import Cart from '../cart/cart';
import { usecartStore } from '../cart/store';

const CartIcon = () => {
    const cart = usecartStore((state: any) => state.cart);

    return (
        <div className="flex justify-center items-center">
            {cart.length !== 0 && (
                <div className="relative py-2">
                    <div className="absolute">
                        <p className="flex h-0.5 w-0.5 items-center justify-center rounded-full bg-red-500 p-3 text-white text-sm">
                            {cart.length}
                        </p>
                    </div>
                </div>
            )}
            <Cart />
        </div>
    );
};

export default CartIcon;
