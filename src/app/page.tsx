import Categories from '@/components/categories/categories';
import Products from '@/components/products/products';

const HomePage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-6">
            <Categories />
            <Products />
        </div>
    );
};

export default HomePage;
