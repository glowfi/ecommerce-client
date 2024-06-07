'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { LogoutDocument } from '@/gql/graphql';
import { checkIsAuth } from '@/lib/utils';
import { useMutation } from '@urql/next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useuserStore } from '../store';

const LogoutForm = () => {
    const [, execLogout] = useMutation(LogoutDocument);
    const userID = useuserStore((state: any) => state.user.id);
    const router = useRouter();

    useEffect(() => {
        const data = checkIsAuth();
        if (data === 'auth') {
            toast({
                variant: 'destructive',
                title: 'Authentication!',
                description: 'Please Login!'
            });
            router.push('/auth/login');
        }
    }, []);

    return (
        <div className="container h-dvh flex flex-col justify-center items-center">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Are you sure you want to logout?
            </h2>
            <div className="flex mt-6 gap-6">
                <Button
                    variant="destructive"
                    onClick={async () => {
                        useuserStore.setState({
                            user: {
                                email: null,
                                profile_pic: null,
                                name: null,
                                id: null
                            }
                        });

                        await execLogout({
                            userID
                        });

                        router.push('/');
                    }}
                >
                    Yes
                </Button>
                <Button
                    variant="default"
                    onClick={() => {
                        router.push('/');
                    }}
                >
                    No
                </Button>
            </div>
        </div>
    );
};

export default LogoutForm;
