import { Atom, Barcode, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="text-center flex flex-col justify-center items-center h-dvh">
            <div className="animate-bounce">
                <ShoppingBasket className="h-40 w-40" />
            </div>
            <h3 className="scroll-m-20 border-b text-2xl font-semibold tracking-tight">
                Oops! Looks like you&apos;re lost.
            </h3>

            <p className="mt-4">
                <Link
                    href="/"
                    className="hover:opacity-75 transition-all text-blue-500"
                >
                    Go to home
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
