'use client';

import LoadingSpinner from '@/components/loadingspinners/loadingspinner';
import { ConfirmaccDocument } from '@/gql/graphql';
import { useQuery } from '@urql/next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ConfirmAccount = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();

    const [result, reexecuteQuery] = useQuery({
        query: ConfirmaccDocument,
        variables: {
            token: ID as string
        },
        requestPolicy: 'network-only'
    });
    const { data, fetching, error } = result;

    if (fetching) {
        return (
            <div className="flex h-dvh justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    <LoadingSpinner />
                </h1>
            </div>
        );
    } else if (
        data?.confirmAccount?.err === 'Expired' ||
        data?.confirmAccount?.err
    ) {
        return (
            <div className="flex flex-col h-dvh justify-center items-center gap-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    Link has expired!
                </h1>
                <div className="flex flex-col justify-center items-center">
                    <p className="underline font-semibold">
                        <Link href={'/auth/signup'}>
                            Recreate a new account
                        </Link>
                    </p>
                    <p className="underline font-semibold">
                        <Link href={'/'}>Go back to home</Link>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col h-dvh justify-center items-center gap-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                Account Verified!
            </h1>
            <div className="flex flex-col justify-center items-center">
                <p className="underline font-semibold">
                    <Link href={'/auth/login'}>Go to to login page</Link>
                </p>
            </div>
        </div>
    );
};

export default ConfirmAccount;
