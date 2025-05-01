import React, { use, useEffect, useState } from 'react';
import  SingleProduct from '../common/SingleProduct';

const Products = ({ name }) => {
    

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data.slice(0, 10))) 
            .catch((error) => console.error('Error fetching products:', error));
    }, [])

    return (
        <div className="mt-10">
            <div className="mb-6 flex items-center justify-between">
                <p className="font-semibold text-3xl text-blue-900 ">{name}</p>
                <div className="">
                    <button className="cursor-pointer bg-white text-blue-500 hover:bg-[#5dac46] hover:text-white font-bold py-2 px-6 rounded-md shadow-lg transition-colors duration-300 border border-solid border-blue-500">
                        Xem tất cả
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto flex gap-3 px-4 py-4 bg-blue-500 rounded-md shadow-md custom-scrollbar">
                {products.map((product) => (
                    <SingleProduct key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;