import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] px-4 py-12">
            <div className="max-w-md w-full space-y-6 text-center">
                <ShoppingBasket className="mx-auto h-32 w-32 animate-bounce" />
                <h1 className="text-3xl font-bold tracking-tight">
                    404 Not Found
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    The page you&aposre looking for doesn&apost exist or has
                    been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
