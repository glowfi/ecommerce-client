'use client';

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ReviewpercentageDocument } from '@/gql/graphql';
import { getClient } from '@/lib/graphqlserver';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../loadingspinners/loadingspinner';
import { useusecurrProdStore } from './product-store';
import humanNumber from 'human-number';
import { StarIcon } from '../ui/staricon';

const loadData = async (productId: string) => {
    const lastIdx = useusecurrProdStore.getState().lastIdx;

    if (lastIdx === productId) {
        return;
    }

    const data = await getClient().query(ReviewpercentageDocument, {
        prodId: productId
    });

    if (data?.data?.getReviewsPercentage?.data) {
        console.log(data?.data?.getReviewsPercentage?.data);
        useusecurrProdStore.setState({
            ratings: data?.data?.getReviewsPercentage?.data
        });
    }
};

export default function Reviewpercentage() {
    const pathname = usePathname();

    let ID = pathname.split('/').pop();

    const [fetching, setFetching] = useState(false);
    const ratings = useusecurrProdStore((state: any) => state.ratings);

    useEffect(() => {
        setFetching(true);

        loadData(ID as string)
            .then(() => {
                setFetching(false);
            })
            .catch(() => {
                setFetching(false);
            });
    }, []);

    if (fetching) {
        return <LoadingSpinner name={'review percentage'} />;
    }

    return (
        <Card className="w-full max-w-md mt-6">
            <CardHeader>
                <CardTitle>Product Reviews</CardTitle>
                <CardDescription>
                    See what customers are saying about this product.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                    </div>
                    <div className="flex-1">
                        <Progress value={ratings?.fiveStars} />
                    </div>
                    <div className="font-medium">
                        {ratings?.fiveStars?.toFixed(2)}%
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <Progress value={ratings?.fourStars} />
                    </div>
                    <div className="font-medium">
                        {ratings?.fourStars?.toFixed(2)}%
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <Progress value={ratings?.threeStars} />
                    </div>
                    <div className="font-medium">
                        {ratings?.threeStars?.toFixed(2)}%
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <Progress value={ratings?.twoStars} />
                    </div>
                    <div className="font-medium">
                        {ratings?.twoStars?.toFixed(2)}%
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 fill-primary" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <Progress value={ratings?.oneStars} />
                    </div>
                    <div className="font-medium">
                        {ratings?.oneStars?.toFixed(2)}%
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <span>
                    Based on{' '}
                    {ratings?.totalReviews &&
                        humanNumber(ratings?.totalReviews)}{' '}
                    reviews
                </span>
            </CardFooter>
        </Card>
    );
}
