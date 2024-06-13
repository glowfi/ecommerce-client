import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { GetrevuseridDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useuserStore } from '../auth/store';
import { Button } from '../ui/button';
import { LoadingButton } from '../ui/loading-button';
import { TOTAL_ITEMS } from './contants';
import { useuserinfo } from './store';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { getDateHumanReadable } from '@/lib/utils';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);
import ReactTimeAgo from 'react-time-ago';

const getData = async () => {
    const userId = useuserStore.getState().user.id;
    const pageIdx = useuserinfo.getState().pageIdx;
    const hasMore = useuserinfo.getState().hasMore;
    const lastIdx_rev = useuserinfo.getState().lastIdx_rev;
    const allReviews = useuserinfo.getState().allReviews;

    console.log('Enterd', userId, pageIdx);

    if (lastIdx_rev === -1 || lastIdx_rev !== pageIdx) {
        useuserinfo.setState({ lastIdx_rev: pageIdx });
    } else if (lastIdx_rev !== -1 && lastIdx_rev === pageIdx) {
        // setLoading(false);
        // useuserinfo.setState({ loading: false });
        return -1;
    }

    if (hasMore) {
        // useuserinfo.setState({ loading: true });
        const data = await getClient().query(GetrevuseridDocument, {
            userId: userId,
            limit: TOTAL_ITEMS,
            skipping: pageIdx * TOTAL_ITEMS
        });
        console.log('Getting Data', data);

        let currData = data?.data?.getAllReviewsByUserId?.data;

        // if (currData) {
        // console.log(currData);
        // useuserinfo.setState({
        //     allReviews: [...allReviews, ...currData]
        // });

        if (currData && hasMore) {
            let newReview = {};

            for (let index = 0; index < currData.length; index++) {
                let currReview = currData[index];
                // @ts-ignore
                newReview[`${currReview.id}`] = { ...currReview };
            }

            console.log(newReview);

            useuserinfo.setState({
                allReviews: { ...allReviews, ...newReview }
            });

            if (currData.length < TOTAL_ITEMS) {
                useuserinfo.setState({ hasMore: false });
            }
        }

        // setLoading(false);
        // useuserinfo.setState({ loading: false });
        return data;
    }
    return [];
    // }
};
const MyReviews = () => {
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    // const loading = useuserinfo((state: any) => state.loading);

    const allReviews = useuserinfo((state: any) => state.allReviews);
    const pageIdx = useuserinfo((state: any) => state.pageIdx);
    const hasMore = useuserinfo((state: any) => state.hasMore);
    const flattened = Object.values(allReviews);

    useEffect(() => {
        setFetching(true);
        setLoading(true);
        console.log('Before');

        getData()
            .then((data) => {
                console.log('Resolved');
                if (data?.data?.getAllReviewsByUserId?.data || data === -1) {
                    setFetching(false);
                    setLoading(false);
                }
                // } else {
                //     setFetching(false);
                //     setLoading(false);
                // }
            })
            .catch(() => {
                setFetching(false);
                setLoading(false);
            });
        console.log('After');
    }, [pageIdx]);

    if (fetching) {
        console.log('Got execurted');
        return <LoadingSpinner name="user reviews" />;
    }

    return (
        <>
            {flattened?.length === 0 ? (
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    No products reviewed yet!
                </h2>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <Table>
                        <TableCaption>
                            A list of your recent reviews.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {/* <TableHead className="w-[100px]"> */}
                                {/*     ReviewID */}
                                {/* </TableHead> */}
                                <TableHead>Comment</TableHead>
                                <TableHead>Date reviewed</TableHead>
                                <TableHead>Link to product</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {flattened?.map((p: any, idx: number) => {
                                return (
                                    <TableRow key={idx}>
                                        {/* <TableCell className="font-medium"> */}
                                        {/*     {p?.id} */}
                                        {/* </TableCell> */}
                                        <TableCell>
                                            {p?.comment?.slice(0, 35) + '...'}
                                        </TableCell>
                                        <TableCell>
                                            <ReactTimeAgo
                                                date={p?.reviewedAt}
                                                locale="en-US"
                                            />

                                            {/* {getDateHumanReadable( */}
                                            {/*     p?.reviewedAt */}
                                            {/* )} */}
                                        </TableCell>

                                        <TableCell>
                                            <Link
                                                className="underline"
                                                href={`/product/${p?.productReviewed?.id}`}
                                            >
                                                Product Link
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {hasMore && (
                        <LoadingButton
                            className="mt-6"
                            loading={loading}
                            onClick={() => {
                                useuserinfo.setState({ pageIdx: pageIdx + 1 });
                                // useuserinfo.setState({ loading: true });
                            }}
                        >
                            Load more Reviews
                        </LoadingButton>
                    )}
                </div>
            )}
        </>
    );
};

export default React.memo(MyReviews);
