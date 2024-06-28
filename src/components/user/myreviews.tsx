import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { GetrevuseridDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago';
import { useuserStore } from '../auth/store';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { LoadingButton } from '../ui/loading-button';
import { TOTAL_ITEMS } from './contants';
import { Heading, RefetchButton } from './reuseComponents';
import { useuserinfo } from './store';
import { getDateHumanReadable } from '@/lib/utils';
TimeAgo.addDefaultLocale(en);

function convert(html: string) {
    // Create a new div element
    var tempDivElement = document.createElement('div');

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || '';
}

const getData = async () => {
    const userId = useuserStore.getState().user.id;
    const pageIdx = useuserinfo.getState().pageIdx;
    const hasMore = useuserinfo.getState().hasMore;
    const lastIdx_rev = useuserinfo.getState().lastIdx_rev;
    const allReviews = useuserinfo.getState().allReviews;

    if (lastIdx_rev === -1 || lastIdx_rev !== pageIdx) {
        useuserinfo.setState({ lastIdx_rev: pageIdx });
    } else if (lastIdx_rev !== -1 && lastIdx_rev === pageIdx) {
        // setLoading(false);
        // useuserinfo.setState({ loading: false });
        return -1;
    }

    if (hasMore) {
        // useuserinfo.setState({ loading: true });
        const data = await getClient().query(
            GetrevuseridDocument,
            {
                userId: userId,
                limit: TOTAL_ITEMS,
                skipping: pageIdx * TOTAL_ITEMS
            },
            { requestPolicy: 'network-only' }
        );

        let currData = data?.data?.getAllReviewsByUserId?.data;

        // if (currData) {
        //
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

const ShowComment = ({ content, date }: any) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Link
                    className="underline ml-3 hover:animate-in hover:opacity-75"
                    href="#"
                >
                    Read Full Comment
                </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Your Comment</DialogTitle>
                    <DialogDescription>
                        Comment by you on {getDateHumanReadable(date)}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 m-6 py-4">{convert(content)}</div>
            </DialogContent>
        </Dialog>
    );
};

const MyReviews = () => {
    const loading = useuserinfo((state: any) => state.loading);
    const setLoading = useuserinfo((state: any) => state.setLoading);

    const allReviews = useuserinfo((state: any) => state.allReviews);
    const pageIdx = useuserinfo((state: any) => state.pageIdx);
    const hasMore = useuserinfo((state: any) => state.hasMore);
    const reset_rev = useuserinfo((state: any) => state.reset_rev);
    const flattened = Object.values(allReviews);

    useEffect(() => {
        setLoading(true);

        getData()
            .then((data) => {
                //@ts-ignore
                if (data?.data?.getAllReviewsByUserId?.data || data === -1) {
                    setLoading(false);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, [pageIdx, allReviews]);

    if (loading) {
        return <LoadingSpinner name="user reviews" />;
    }

    return (
        <>
            {flattened?.length === 0 ? (
                <div className="flex-col justify-center items-center">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        No products reviewed yet!
                    </h2>
                    <RefetchButton name="reviews" reset_rev={reset_rev} />
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center">
                        <Heading name={'reviews'} />

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Date reviewed</TableHead>
                                    <TableHead>Link to product</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flattened?.map((p: any, idx: number) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell>
                                                <div className="flex gap-3 justify-start items-center">
                                                    {convert(
                                                        `${p?.comment}`
                                                    ).slice(0, 35) + '...'}
                                                    <ShowComment
                                                        content={p?.comment}
                                                        date={p?.reviewedAt}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <ReactTimeAgo
                                                    date={p?.reviewedAt}
                                                    locale="en-US"
                                                />
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

                        <div className="flex flex-col justify-center items-center mt-6 gap-6">
                            {hasMore && (
                                <LoadingButton
                                    className="mt-6"
                                    loading={loading}
                                    onClick={() => {
                                        useuserinfo.setState({
                                            pageIdx: pageIdx + 1
                                        });
                                    }}
                                >
                                    Load more Reviews
                                </LoadingButton>
                            )}

                            <RefetchButton
                                name="reviews"
                                reset_rev={reset_rev}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default React.memo(MyReviews);
