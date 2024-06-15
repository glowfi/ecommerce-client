import Categories from '@/components/categories/categories';
import Front from '@/components/front/front';
import Products from '@/components/products/products';

const HomePage = () => {
    return (
        <div className="container flex-col">
            <Front />
            <Categories />
            <Products />
        </div>
    );
};

export default HomePage;
