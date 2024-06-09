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

const MyReviews = () => {
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    // const loading = useuserinfo((state: any) => state.loading);

    const allReviews = useuserinfo((state: any) => state.allReviews);
    const pageIdx = useuserinfo((state: any) => state.pageIdx);
    const hasMore = useuserinfo((state: any) => state.hasMore);

    useEffect(() => {
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

                if (currData) {
                    console.log(currData);
                    useuserinfo.setState({
                        allReviews: [...allReviews, ...currData]
                    });
                    if (currData.length < TOTAL_ITEMS) {
                        useuserinfo.setState({ hasMore: false });
                    }
                    // setLoading(false);
                    // useuserinfo.setState({ loading: false });
                    return data;
                }
            }
        };
        setFetching(true);
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
        return <h1>Loading user reviews ...</h1>;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Table>
                <TableCaption>A list of your recent reviews.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ProductID</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Link to product</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allReviews?.map((p: any, idx: number) => {
                        return (
                            <TableRow key={idx}>
                                <TableCell className="font-medium">
                                    {p?.productReviewed?.id}
                                </TableCell>
                                <TableCell>
                                    {p?.comment?.slice(0, 25) + '...'}
                                </TableCell>
                                <TableCell>
                                    <Button asChild variant={'outline'}>
                                        <Link
                                            href={`/product/${p?.productReviewed?.id}`}
                                            target="_blank"
                                        >
                                            Product Link
                                        </Link>
                                    </Button>
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
    );
};

export default React.memo(MyReviews);
