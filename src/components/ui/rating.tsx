'use client';

import { cn } from '@/lib/utils';

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

export function StarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

export default Rating;
