'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SkeletonCard } from '../product/SkeletonCard';
import { Button } from '../ui/button';
import { hero_data } from './data';
import { useuserStore } from '../auth/store';
import Link from 'next/link';

const Front = () => {
    const [heroimage, setHeroimage] = useState('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const currUser = useuserStore((state: any) => state.user);

    const scrollToHalfViewport = () => {
        // Calculate the scroll position to half of the viewport height
        const scrollPosition = window.innerHeight / 2;

        // Scroll to the calculated position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth' // Optional: for smooth scrolling
        });
    };

    useEffect(() => {
        const id = setInterval(() => {
            let randomIdx: number = Math.floor(
                Math.random() * Object.keys(hero_data).length
            );

            setHeroimage(hero_data?.[randomIdx]);
        }, 3000);

        return () => clearInterval(id);
    }, []);

    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                            Welcome to {process.env.STORE_NAME}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                            Explore our wide range of high-quality products that
                            cater to all your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button size="lg" onClick={scrollToHalfViewport}>
                                Shop Now
                            </Button>
                            {!currUser.email && (
                                <Button
                                    className="block sm:hidden text-center"
                                    asChild
                                    variant={'default'}
                                >
                                    <Link href="/auth/login">Login</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    {!loaded && <SkeletonCard props={{ w: '600', h: '400' }} />}

                    {heroimage ? (
                        <Image
                            onLoad={() => setLoaded(true)}
                            src={heroimage}
                            width={600}
                            height={400}
                            alt="Hero Image"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover transition-all hover:opacity-75 cursor-pointer"
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </section>
    );
};

export default Front;
