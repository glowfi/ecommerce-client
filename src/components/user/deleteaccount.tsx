'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { DeleteaccDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { useuserStore } from '../auth/store';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '../ui/loading-button';

const DeleteAccount = () => {
    const [, execDelete] = useMutation(DeleteaccDocument);
    const userId = useuserStore.getState().user.id;
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <LoadingButton
                    variant="destructive"
                    className="w-fit"
                    loading={loading}
                >
                    Delete Account
                </LoadingButton>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={async () => {
                            setLoading(true);
                            let res = await execDelete({ userId });
                            if (res?.data?.deleteUser?.data) {
                                useuserStore.setState({
                                    user: {
                                        email: null,
                                        profile_pic: null,
                                        name: null,
                                        id: null
                                    }
                                });
                                toast({
                                    title: 'Account Deleted!',
                                    description:
                                        'Your account has been deleted!'
                                });
                                router.push('/');
                            } else {
                                toast({
                                    title: 'Failed to delete account!',
                                    description: res?.data?.deleteUser
                                        ?.err as string
                                });
                            }
                            setLoading(false);
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAccount;
