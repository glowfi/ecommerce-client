'use client';

import { cn } from '@/lib/utils';
import { StarIcon } from './staricon';

const Rating = ({ rating, setRating, totalstars = 5 }: any) => {
    return (
        <div className={cn('flex items-center')}>
            {[...Array(totalstars)].map((_, i) => (
                <StarIcon
                    className={cn(
                        `w-6 h-6 m-1 ${i + 1 <= rating ? 'fill-current' : 'fill-transparent'} ${setRating && `hover:fill-current cursor-pointer`}`
                    )}
                    key={i}
                    onClick={() => setRating && setRating(i + 1)}
                />
            ))}
        </div>
    );
};

export default Rating;
