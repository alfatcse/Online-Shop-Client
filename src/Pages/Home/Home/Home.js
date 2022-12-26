import React from 'react';
import useTitleHook from '../../../CustomHook/TitleHook/useTitleHook';
import ProductCard from '../ProductCatagory/ProductCard/ProductCard';
const Home = () => {
    useTitleHook('Home');
    return (
        <div>
            <ProductCard></ProductCard>
        </div>
    );
};
export default Home;