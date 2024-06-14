/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tawEo5XjCW9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Component() {
    const categories = [
        {
            id: 1,
            name: 'Clothing',
            image: '/placeholder.svg'
        },
        {
            id: 2,
            name: 'Accessories',
            image: '/placeholder.svg'
        },
        {
            id: 3,
            name: 'Electronics',
            image: '/placeholder.svg'
        },
        {
            id: 4,
            name: 'Home & Garden',
            image: '/placeholder.svg'
        }
    ];
    const products = [
        {
            id: 1,
            name: 'Cozy Sweater',
            description: 'Soft and comfortable knit sweater',
            price: 49.99,
            image: '/placeholder.svg'
        },
        {
            id: 2,
            name: 'Leather Backpack',
            description: 'Durable and stylish backpack',
            price: 79.99,
            image: '/placeholder.svg'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            description: 'High-quality audio experience',
            price: 99.99,
            image: '/placeholder.svg'
        },
        {
            id: 4,
            name: 'Outdoor Grill',
            description: 'Perfect for summer BBQs',
            price: 199.99,
            image: '/placeholder.svg'
        },
        {
            id: 5,
            name: 'Linen Curtains',
            description: 'Elegant and light-filtering',
            price: 59.99,
            image: '/placeholder.svg'
        },
        {
            id: 6,
            name: 'Smartwatch',
            description: 'Tracks your fitness and more',
            price: 149.99,
            image: '/placeholder.svg'
        }
    ];
    return (
        <div className="flex flex-col">
            <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                Discover the Best Products for Your Lifestyle
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                                Explore our wide range of high-quality products
                                that cater to all your needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Button size="lg">Shop Now</Button>
                                <Button variant="outline" size="lg">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                        <img
                            src="/placeholder.svg"
                            width={600}
                            height={400}
                            alt="Hero Image"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-2xl font-bold mb-8">
                        Shop by Category
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href="#"
                                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                                prefetch={false}
                            >
                                <img
                                    src="/placeholder.svg"
                                    alt={category.name}
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-64"
                                />
                                <div className="absolute inset-0 bg-black/70 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                                    <h3 className="text-white font-semibold text-lg">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-2xl font-bold mb-8">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
                            >
                                <img
                                    src="/placeholder.svg"
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-64"
                                />
                                <div className="p-4 bg-white dark:bg-gray-950">
                                    <h3 className="font-bold text-lg">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="font-semibold text-lg">
                                            ${product.price}
                                        </span>
                                        <Button size="sm">Add to Cart</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
