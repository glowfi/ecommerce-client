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
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="hidden" ref={bref}>
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Preview</DialogTitle>
                </DialogHeader>
                <div className="gap-4 py-4 flex flex-col justify-center items-center">
                    {!loaded && <SkeletonCard props={{ w: '300', h: '300' }} />}

                    {currImage && (
                        <>
                            <Image
                                onLoad={() => setLoaded(true)}
                                src={currImage}
                                width={300}
                                height={300}
                                alt="Not Found"
                            />
                            {loaded && (
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
