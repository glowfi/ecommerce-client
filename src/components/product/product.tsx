'use client';
import { Create_ReviewDocument, GetProductByIdDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { useMutation } from '@urql/next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useuserStore } from '../auth/store';
import RichTextEditor from '../editor/Tiptap';
import { LoadingButton } from '../ui/loading-button';
import { useToast } from '../ui/use-toast';
import CommentSection from './commentsection';
import { ImagePreview } from './imagepreview';
import Itemcarousel from './itemcarousel';
import ItemPrev from './itempreview';
import { useusecurrProdStore } from './product-store';
import ProductDetails from './productdetails';

const loadData = async (productId: string) => {
    const data = await getClient().query(GetProductByIdDocument, {
        productId
    });

    useusecurrProdStore.setState({
        prodID: productId
    });

    if (data?.data?.getProductById?.data) {
        useusecurrProdStore.setState({
            currProd: data?.data?.getProductById?.data
        });
    }
    return data;
};

const Product = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const currProd = useusecurrProdStore((state: any) => state.currProd);
    const [reviewText, setReviewText] = useState('');
    const user = useuserStore((state: any) => state.user);
    const { toast } = useToast();
    const allcomments = useusecurrProdStore((state: any) => state.comments);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    const [, execCreateReview] = useMutation(Create_ReviewDocument);

    useEffect(() => {
        setFetching(true);
        loadData(ID as string)
            .then((data) => {
                if (data.data?.getProductById?.data) {
                    setFetching(false);
                }
            })
            .catch(() => {
                setFetching(false);
            });
    }, [ID]);

    if (fetching) {
        return <h1>Loading Product ....</h1>;
    }

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                        <div className="grid auto-rows-max gap-4 md:gap-8 lg:col-span-2 justify-center items-center">
                            <div className="col-span-6">
                                <ItemPrev currProduct={currProd} />
                                <div className="flex justfy-center items-center gap-6 mt-6">
                                    <Itemcarousel currProduct={currProd} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <ProductDetails currProduct={currProd} />
                        </div>
                    </main>
                </div>
                <ImagePreview />
            </div>
            <div className="container">
                <div className="flex flex-col gap-3">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Add Your Review
                    </h3>
                    <RichTextEditor value="" onChange={setReviewText} />
                    <LoadingButton
                        loading={loading}
                        className="w-fit"
                        onClick={async () => {
                            if (!user.id) {
                                setLoading(true);
                                toast({
                                    variant: 'destructive',
                                    title: 'Authentication!',
                                    description: 'Login to add review!'
                                });
                                setLoading(false);
                            } else {
                                setLoading(true);

                                let newComment = {
                                    comment: reviewText,
                                    userReviewed: { name: user.name }
                                };

                                let data = await execCreateReview({
                                    data: {
                                        comment: reviewText,
                                        userID: user.id,
                                        productID: ID as string
                                    }
                                });

                                let newObj = {} as any;

                                let getID = data?.data?.createReview?.data;

                                if (getID) {
                                    newObj[`${getID.id}`] = {
                                        ...newComment,
                                        comment: getID.comment
                                    };
                                    useusecurrProdStore.setState({
                                        comments: { ...newObj, ...allcomments }
                                    });
                                    setReviewText('');
                                    setLoading(false);
                                }
                            }
                        }}
                    >
                        Add Review
                    </LoadingButton>
                </div>
                <CommentSection />
            </div>
        </>
    );
};

export default React.memo(Product);
