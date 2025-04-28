import React, { useEffect, useState } from 'react';
import img1 from '../../img/Header/BannerHealth6.png';
import img2 from '../../img/Header/BannerHealth7.png';
import img3 from '../../img/Header/imgSelection/Baby.png';
import img4 from '../../img/Header/imgSelection/MomAndBaby.png';
import img5 from '../../img/Header/imgSelection/Old.png';
import SingleProduct from '../common/SingleProduct';

const SelectionProduct = ({ name }) => {
    const [category, setCategory] = useState([]);
    const [active, setActive] = useState(null);
    const [products, setProducts] = useState([]);
    const searchMost = [
        "Dầu cá","Omega3","Canxi","Vitamin D", "Vitamin C", "Loãng xương", "Mệt mỏi", "Mất ngủ"
    ]

    useEffect(() => {
        fetch('http://localhost:3000/api/categories')
            .then(response => response.json())
            .then(data => {
                setCategory(data);
                // Thiết lập active với tên của category đầu tiên sau khi dữ liệu đã được load
                if (data && data.length > 0) {
                    setActive(data[0].name);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);



    useEffect(() => {
        if (active) {
            fetch('http://localhost:3000/api/products?categoryName=' + active)
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        } else {
            setProducts([]);
        }
    }, [active]);

    const handleActive = (key) => {
        setActive(key);
    };

    return (
        <div>
            <div><p className="font-semibold text-3xl text-blue-500 my-10">{name}</p></div>
            <div className='flex flex-row'>
                <div className='w-[20%] mr-6'>
                    <div className='mb-4'>
                        <a href="#" className="block h-full w-full">
                            <img
                                src={img1}
                                alt=""
                                className="w-full h-[565px] object-cover rounded-lg"
                            />
                        </a>
                    </div>
                    <div>
                        <a href="#" className="block h-full w-full">
                            <img
                                src={img1}
                                alt=""
                                className="w-full h-[565px] object-cover rounded-lg"
                            />
                        </a>
                    </div>
                </div>
                <div className='w-[80%]'>
                    {/* Button Category */}
                    <div className='flex'>
                        {category.slice(0, 3).map((item, index) => (
                            <button
                                onClick={() => handleActive(item.name)}
                                key={item.id}
                                className={`mx-4 flex justify-center items-center font-semibold py-3 px-4 rounded-sm mb-4 border border-blue-500 cursor-pointer hover:bg-blue-500 group ${active === item.name ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <img
                                    src={img3}
                                    alt=""
                                    className="w-[30px] h-[30px] object-cover rounded-lg mr-2"
                                />
                                <p className='group-hover:text-white'>{item.name}</p>
                            </button>
                        ))}
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        {products.map((product, index) => (
                            <SingleProduct key={product._id} product={product} />
                        ))}
                    </div>
                    <div className='flex justify-center my-3'>
                        <button className='hover:bg-[#003cbf] hover:text-white cursor-pointer transition-colors duration-300  px-4 py-2 border-2 border-solid border-blue-700 rounded-sm font-lg'>Xem tất cả</button>
                    </div>
                    <div>
                        <p className='text-lg font-medium mb-2'>Tìm kiếm nhiều nhất:</p>
                        {searchMost.map((item,index) => (
                            <button className='text-white bg-blue-500 rounded-sm px-2 py-1 mr-3 hover:bg-[#5dac46] cursor-pointer transition-colors duration-300'>{item}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectionProduct;