'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { OtpexpiredDocument, ResetpassDocument } from '@/gql/graphql';
import { useMutation, useQuery } from '@urql/next';
import { usePathname, useRouter } from 'next/navigation';
import ResetForm from './resetform';
import Link from 'next/link';
import LoadingSpinner from '@/components/loadingspinners/loadingspinner';

const ResetPasswordForm = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const router = useRouter();

    const [result, reexecuteQuery] = useQuery({
        query: OtpexpiredDocument,
        variables: {
            data: { token: ID as string }
        },
        requestPolicy: 'network-only'
    });
    const { data, fetching, error } = result;

    const [, execReset] = useMutation(ResetpassDocument);
    const { toast } = useToast();

    if (fetching) {
        return (
            <div className="flex h-dvh justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    <LoadingSpinner />
                </h1>
            </div>
        );
    }

    if (
        data?.checkOtpExpired?.data?.hasExpired ||
        !data?.checkOtpExpired?.data
    ) {
        return (
            <div className="flex flex-col h-dvh justify-center items-center gap-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    Link has expired!
                </h1>
                <div className="flex flex-col justify-center items-center">
                    <p className="underline font-semibold">
                        <Link href={'/auth/forgetpassword'}>
                            Reissue a new Link
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
        <div className="flex h-dvh justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Enter a secure password.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <ResetForm ID={ID} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;
