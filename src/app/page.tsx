import Categories from '@/components/categories/categories';
import Front from '@/components/front/front';
import Products from '@/components/products/products';

const HomePage = () => {
    return (
        <>
            <Front />

            <div className="container flex-col">
                <Categories />
                <Products />
            </div>
        </>
    );
};

export default HomePage;
