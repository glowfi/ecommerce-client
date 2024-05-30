import Product from '@/components/product/product';
import React from 'react';

const ProductPage = ({ params }: any) => {
    return (
        <div className="mt-6 container">
            {/* <div style={{ border: '1px solid red' }} className="mt-6 container"> */}
            <Product />
        </div>
    );
};

export default ProductPage;
