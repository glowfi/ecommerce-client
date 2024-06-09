'use client';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Get_Reviews_PaginateDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { getDateHumanReadable, getNameInitials } from '@/lib/utils';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import { LoadingButton } from '../ui/loading-button';
import { TOTAL_ITEMS } from './constants';
import { useusecurrProdStore } from './product-store';

const loadData = async (ID: string) => {
    const pageIdx = useusecurrProdStore.getState().pageIdx;
    const hasMore = useusecurrProdStore.getState().hasMore;
    const allcomments = useusecurrProdStore.getState().comments;

    const lastIdx = useusecurrProdStore.getState().lastIdx;

    if (!hasMore && ID == lastIdx) {
        return;
    }

    if (!lastIdx) {
        useusecurrProdStore.setState({ lastIdx: ID });
    } else if (ID !== undefined && ID !== lastIdx) {
        useusecurrProdStore.setState({ lastIdx: ID });
        useusecurrProdStore.setState({ hasMore: true });
        useusecurrProdStore.setState({ pageIdx: 0 });
        useusecurrProdStore.setState({ comments: [] });
    }

    if (hasMore) {
        useusecurrProdStore.setState({ isloading: true });
        const { data } = await getClient().query(
            Get_Reviews_PaginateDocument,
            {
                prodId: ID as string,
                skipping: pageIdx * TOTAL_ITEMS,
                limit: TOTAL_ITEMS
            },
            {
                requestPolicy: 'network-only'
            }
        );

        useusecurrProdStore.setState({ isloading: false });

        if (data?.getReviewsPaginate?.data && hasMore) {
            let new_data = data?.getReviewsPaginate?.data;
            let newComments = {};

            for (let index = 0; index < new_data.length; index++) {
                let currComment = new_data[index];
                // @ts-ignore
                newComments[`${currComment.id}`] = { ...currComment };
            }

            useusecurrProdStore.setState({
                comments: { ...allcomments, ...newComments }
            });

            if (new_data.length < TOTAL_ITEMS) {
                useusecurrProdStore.setState({ hasMore: false });
            }
        }
    }
};

const CommentSection = () => {
    const pathname = usePathname();
    let ID = pathname.split('/').pop();
    const allcomments = useusecurrProdStore((state: any) => state.comments);
    const pageIdx = useusecurrProdStore((state: any) => state.pageIdx);
    const hasMore = useusecurrProdStore((state: any) => state.hasMore);
    const isloading = useusecurrProdStore((state: any) => state.isloading);
    const flattened = Object.values(allcomments);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadData(ID as string);
    }, [pageIdx]);

    if (isloading) {
        return (
            <>
                <h1>Loading comments ...</h1>
            </>
        );
    }

    return (
        <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
                Reviews
            </h3>
            {flattened?.map((p: any, idx: any) => {
                return (
                    <Card className="mt-6" key={idx}>
                        <CardHeader>
                            <CardTitle></CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>
                                        {p?.userReviewed?.name &&
                                            getNameInitials(
                                                p?.userReviewed?.name
                                            )}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex flex-col">
                                        <b className="text-sm font-semibold leading-none">
                                            {p?.userReviewed?.name}
                                        </b>
                                        <p>
                                            <b>
                                                {getDateHumanReadable(
                                                    p?.reviewedAt
                                                )}
                                            </b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <CardFooter>
                                <p>{parse(`${p?.comment}`)}</p>
                            </CardFooter>
                        </CardContent>
                    </Card>
                );
            })}
            {hasMore && (
                <div className="flex flex-col justify-center items-center mt-6">
                    <LoadingButton
                        loading={loading}
                        onClick={() => {
                            useusecurrProdStore.setState({
                                pageIdx: pageIdx + 1
                            });
                            setLoading(false);
                        }}
                    >
                        Load More
                    </LoadingButton>
                </div>
            )}
        </>
    );
};

export default React.memo(CommentSection);
