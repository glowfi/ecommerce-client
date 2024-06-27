'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { userefStore } from './store';
import { SkeletonCard } from './SkeletonCard';

export function ImagePreview() {
    const bref = useRef(null);

    useEffect(() => {
        userefStore.setState({ eventRef: bref });
    }, [bref]);

    const currImage = userefStore((state: any) => state.currImage);
    const [isloading, setIsloading] = useState(true);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="hidden" ref={bref}>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-fit">
                <DialogHeader>
                    <DialogTitle>Preview</DialogTitle>
                </DialogHeader>
                <div className="gap-4 py-4 flex flex-col justify-center items-center">
                    {isloading && (
                        <SkeletonCard props={{ w: '300', h: '300' }} />
                    )}

                    {currImage && (
                        <>
                            <Image
                                onLoadingComplete={() => setIsloading(false)}
                                src={currImage}
                                width={300}
                                height={300}
                                alt="Not Found"
                                className={`
              duration-700 ease-in-out group-hover:opacity-75
              ${
                  isloading
                      ? 'scale-100 blur-xl grayscale'
                      : 'scale-100 blur-0 grayscale-0'
              })`}
                            />
                            {!isloading && (
                                <div className="flex justify-center items-center">
                                    <Link
                                        href={currImage}
                                        target="_blank"
                                        className="hover:opacity-75 transition-all"
                                    >
                                        Watch in full resolution
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
