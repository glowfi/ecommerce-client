import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../products/ProductCard';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../loadingspinners/loadingspinner';

export default function Suggestions() {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const path = usePathname();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            let currPath = path.split('/');
            let data = await axios.get(
                `${process.env.RECOMMENDATION_APP_URL}/api/cbfiltering?product_id=${currPath[currPath.length - 1]}&num_recommendations=8`
            );
            console.log(data);
            if (data.data.data) {
                let newData = data.data.data;
                // let newData = data.data.data.sort(
                //     (a: any, b: any) =>
                //         parseInt(
                //             (
                //                 ((100 - a?.discountPercent) / 100) *
                //                 a?.price
                //             ).toFixed(0)
                //         ) -
                //         parseInt(
                //             (
                //                 ((100 - b?.discountPercent) / 100) *
                //                 b?.price
                //             ).toFixed(0)
                //         )
                // );

                const newList = newData.map((obj: any) => ({
                    ...obj,
                    id: obj._id,
                    _id: undefined
                }));

                setRelatedProducts(newList);
            }
            setLoading(false);
        };
        getData();
    }, []);

    if (loading) {
        return <LoadingSpinner name="recommendations" />;
    }

    return (
        <section className="py-12 mt-6 rounded-lg">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:gap-8">
                    <div className="grid gap-1">
                        <h2 className="text-2xl font-bold tracking-tight">
                            You May Also Like
                        </h2>
                        <p className="text-muted-foreground">
                            Discover more products you might enjoy
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
                        {relatedProducts.map((product, idx) => (
                            <div key={idx}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
