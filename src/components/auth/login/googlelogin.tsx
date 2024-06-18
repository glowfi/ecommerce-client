'use client';

import { useToast } from '@/components/ui/use-toast';
import { LogingoogleDocument } from '@/gql/graphql';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@urql/next';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useuserStore } from '../store';

const GoogleloginButton = () => {
    const [, execGoogleLogin] = useMutation(LogingoogleDocument);
    const addUser = useuserStore((state: any) => state.addUser);
    const router = useRouter();
    const { toast } = useToast();

    return (
        <>
            <div className="flex justify-center items-center">
                <GoogleLogin
                    ux_mode="popup"
                    onSuccess={async (credentialResponse) => {
                        let decoded = jwtDecode(
                            credentialResponse?.credential as string
                        );

                        console.log(decoded);

                        let name =
                            // @ts-ignore
                            decoded?.given_name + ' ' + decoded?.family_name;
                        // @ts-ignore
                        let email = decoded?.email;
                        // @ts-ignore
                        let profilePic = decoded?.picture;

                        let res = await execGoogleLogin(
                            {
                                data: {
                                    name,
                                    email,
                                    userType: 'user',
                                    profilePic
                                }
                            },
                            { requestPolicy: 'network-only' }
                        );

                        let curr_data = res?.data?.loginGoogle?.data;
                        let curr_err = res?.data?.loginGoogle?.err;

                        console.log(curr_data);
                        console.log(curr_err);

                        if (curr_err) {
                            toast({
                                variant: 'destructive',
                                title: 'Authentication Error!',
                                description: curr_err
                            });
                        } else if (curr_data) {
                            let address = {
                                street_address:
                                    curr_data?.address?.streetAddress,
                                country: curr_data?.address?.country,
                                state: curr_data?.address?.state,
                                city: curr_data?.address?.city,
                                zipCode: curr_data?.address?.zipCode,
                                countryCode: curr_data?.address?.countryCode
                            };

                            addUser({
                                email: curr_data?.email,
                                profile_pic: curr_data?.profilePic,
                                name: curr_data?.name,
                                id: curr_data?.userID,
                                address,
                                phone_number: curr_data?.phoneNumber
                            });
                            toast({
                                variant: 'default',
                                title: 'Login Successful!',
                                description: `Logged in as ${curr_data?.name}!`
                            });
                            useuserStore.setState({
                                isloggedinwithgoogle: true
                            });

                            router.push('/');
                        } else {
                            toast({
                                variant: 'destructive',
                                title: 'Some Error occured!',
                                description: curr_err as string
                            });
                        }
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </>
    );
};

export default GoogleloginButton;
