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
import { useRef } from 'react';
import { userefStore } from './store';

export function ImagePreview() {
    const bref = useRef(null);
    userefStore.setState({ eventRef: bref });
    const currImage = userefStore((state: any) => state.currImage);

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
                    <Image
                        src={currImage}
                        width={500}
                        height={500}
                        alt="Not Found"
                    />
                    <Link
                        href={currImage}
                        target="_blank"
                        className="hover:opacity-75 transition-all"
                    >
                        Watch in full resolution
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
