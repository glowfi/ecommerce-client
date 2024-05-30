import Image from 'next/image';
import React from 'react';

const ItemPrev = ({ currProduct }: any) => {
    return (
        <Image
            src={currProduct?.coverImage?.[1]}
            alt="Not Found"
            width={500}
            height={700}
            className="gap-6"
            layout="fixed"
            objectFit="cover"
            priority
        />
    );
};

export default React.memo(ItemPrev);
