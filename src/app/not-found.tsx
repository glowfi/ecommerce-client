import { Atom, Barcode, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="text-center flex flex-col justify-center items-center h-dvh">
            <h1 className="mb-4 text-6xl font-semibold">404</h1>
            <p className="mb-4 text-lg">Oops! Looks like you&apos;re lost.</p>
            <div className="animate-bounce">
                <ShoppingBasket className="h-40 w-40" />
            </div>
            <p className="mt-4">
                <Link
                    href="/"
                    className="underline hover:opacity-75 transition-all"
                >
                    Go to Home Page
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
