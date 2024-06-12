'use client';
import { Create_ReviewDocument } from '@/gql/graphql';
import { useMutation } from '@urql/next';
import React, { useState } from 'react';
import { useuserStore } from '../auth/store';
import RichTextEditor from '../editor/Tiptap';
import { LoadingButton } from '../ui/loading-button';
import { useToast } from '../ui/use-toast';
import CommentSection from './commentsection';
import { useusecurrProdStore } from './product-store';
import Productcontainer from './productcontainer';
import { useuserinfo } from '../user/store';
import { usePathname } from 'next/navigation';

const Product = () => {
    const pathname = usePathname();

    let ID = pathname.split('/').pop();

    const [reviewText, setReviewText] = useState('');
    const user = useuserStore((state: any) => state.user);
    const { toast } = useToast();
    const allcomments = useusecurrProdStore((state: any) => state.comments);
    const [loading, setLoading] = useState(false);

    const [, execCreateReview] = useMutation(Create_ReviewDocument);

    return (
        <>
            <Productcontainer />
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
                                        comment: getID.comment,
                                        reviewedAt: getID.reviewedAt
                                    };
                                    useusecurrProdStore.setState({
                                        comments: { ...newObj, ...allcomments }
                                    });
                                    setReviewText('');
                                    useuserinfo.setState({
                                        pageIdx: 0,
                                        hasMore: true,
                                        lastIdx_rev: -1,
                                        allReviews: {}
                                    });
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
