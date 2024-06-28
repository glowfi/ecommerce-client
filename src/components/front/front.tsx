'use client';
import React from 'react';
import { Spotlight } from '../ui/Spotlight';

const Front = () => {
    return (
        <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 text-center text-wrap">
                    Welcome <br /> to the <br />
                    {process.env.STORE_NAME}
                </h1>

                <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Enjoy a seamless shopping experience, where every click
                    brings joy. Let us make your shopping adventure memorable!
                </p>
            </div>
        </div>
    );
};

export default React.memo(Front);
