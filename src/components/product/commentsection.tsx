'use client';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Get_Reviews_PaginateDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { getDateHumanReadable, getNameInitials } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { LoadingButton } from '../ui/loading-button';
import Rating from '../ui/rating';
import { TOTAL_ITEMS } from './constants';
import { useusecurrProdStore } from './product-store';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from 'react-time-ago';

const loadData = async (ID: string) => {
    const pageIdx = useusecurrProdStore.getState().pageIdx;
    const hasMore = useusecurrProdStore.getState().hasMore;
    const allcomments = useusecurrProdStore.getState().comments;

    const lastIdx = useusecurrProdStore.getState().lastIdx;

    if (!hasMore && ID == lastIdx) {
        return;
    }
    if (lastIdx === -1) {
        
        useusecurrProdStore.setState({ lastIdx: ID });
    } else if (lastIdx !== ID) {
        
        useusecurrProdStore.setState({ lastIdx: ID });
        useusecurrProdStore.setState({ hasMore: true });
        useusecurrProdStore.setState({ pageIdx: 0 });
        useusecurrProdStore.setState({ comments: {} });
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

            const allcomments = useusecurrProdStore.getState().comments;

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
                <LoadingSpinner name="comments" />
            </>
        );
    }

    return (
        <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6">
                Reviews
            </h3>
            <div className="px-4 md:px-6 max-w-2xl grid gap-12 mt-6">
                {flattened?.map((p: any, idx: any) => {
                    return (
                        <div key={idx}>
                            <div className="flex w-full gap-4 border p-6">
                                <Avatar className="w-12 h-12 border hover:opacity-75 transition-all hover:cursor-pointer">
                                    <AvatarImage
                                        src={p?.userReviewed?.profilePic}
                                    />
                                    <AvatarFallback>
                                        {p?.userReviewed?.name &&
                                            getNameInitials(
                                                p?.userReviewed?.name
                                            )}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid gap-4">
                                    <div className="flex gap-4">
                                        <div className="grid gap-0.5 text-sm justify-between items-between">
                                            <h3 className="font-semibold hover:underline hover:opacity-75 transition-all hover:cursor-pointer">
                                                {p?.userReviewed?.name}
                                            </h3>
                                            <time className="text-sm text-gray-500 dark:text-gray-400">
                                                <ReactTimeAgo
                                                    date={p?.reviewedAt}
                                                    locale="en-US"
                                                />
                                                {/* {getDateHumanReadable( */}
                                                {/*     p?.reviewedAt */}
                                                {/* )} */}
                                            </time>
                                            <Rating
                                                totalstars={5}
                                                rating={p?.rating}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                                        {parse(`${p?.comment}`)}
                                    </div>
                                </div>
                            </div>
                            {/* <Separator /> */}
                        </div>
                    );
                })}
                {hasMore && (
                    <div className="flex flex-col justify-center items-center">
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
            </div>
        </>
    );
};

export default React.memo(CommentSection);
