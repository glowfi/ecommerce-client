'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import axios from 'axios';
import { UpdateuserDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import { LoadingButton } from '../ui/loading-button';
import router from 'next/router';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useuserStore } from '../auth/store';

const FileUpload = ({ userId }: any) => {
    const [, execUpdate] = useMutation(UpdateuserDocument);

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const fileSelectedHandler = (e: any) => {
        setSelectedFile(e.target.files[0]);
    };

    const fileUploadHandler = async () => {
        setLoading(true);
        if (!selectedFile) {
            toast({
                variant: 'destructive',
                title: 'Error!',
                description: 'No Images provided!'
            });
        }
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('api_key', process.env.CLOUDINARY_API_KEY);
            formData.append('upload_preset', 'w9fvdkls');
            const data = await axios.post(
                `https://api.cloudinary.com/v1_1/diwstgzd0/image/upload`,
                formData
            );
            // console.log(data.data.secure_url);

            const res = await execUpdate({
                data: {
                    profilePic: data.data.secure_url
                },
                userId
            });
            if (res?.data?.updateUser?.data) {
                router.refresh();
                useuserStore.setState({
                    user: {
                        ...useuserStore.getState().user,
                        profile_pic: data.data.secure_url
                    }
                });
                toast({
                    title: 'Success!',
                    description: 'Updated Profile Pic!'
                });
                // router.push(`/user/${user?.id}`);
            } else if (res?.data?.updateUser?.err) {
                toast({
                    variant: 'destructive',
                    title: 'Error!',
                    description: res?.data?.updateUser?.err
                });
            }
        } catch (error) {
            console.log(error);
        }
        setSelectedFile(null);
        setLoading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <Input
                type="file"
                className="mt-1 hover:cursor-pointer text-sm w-[210px]"
                placeholder="Update profile pic"
                onChange={fileSelectedHandler}
            />
            <LoadingButton
                loading={loading}
                size={'sm'}
                variant={'link'}
                onClick={fileUploadHandler}
            >
                Update Profile Picture
            </LoadingButton>
        </div>
    );
};

export default FileUpload;
