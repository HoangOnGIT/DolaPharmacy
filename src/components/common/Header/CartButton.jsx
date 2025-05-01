import { Button, Divider, Dropdown, Space } from 'antd';
import useToken from 'antd/es/theme/useToken';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';

export default function CartButton() {

    const {cart,     removeItemFromCart,
    } = useCart();

    const cartItems = cart.items ? cart.items : [];

   
    
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    
    const total = cartItems.reduce((acc, item) => {
        const price = item.salePrice || item.basePrice; 
        return acc + item.quantity * price;
    }, 0);

    const items = cartItems.map(item => ({
        key: item.id,
        label: (
            <div className="flex items-center justify-between py-2 w-full">
                <div className="flex items-center" onClick={() => nav("/product-detail/" + item.productId)}>
                    <img 
                        src={item.images[0].url} 
                        alt={item.name} 
                        className="w-10 h-10 object-cover mr-2 rounded"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex text-sm gap-2 items-center">
                            <span className="font-semibold text-blue-700">SL: {item.quantity}</span>
                            <span className="text-gray-400">|</span>
                            <span className="font-semibold text-emerald-600">{new Intl.NumberFormat("vi-VN").format(item.salePrice ? item.salePrice : item.basePrice)}đ</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItemFromCart(item.id);
                    }}
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </div>
        ),
    }));
    
    const nav = useNavigate();

    function handleClickCart() {
        nav("/cart");
    }

    function handleMouseIn() {
        setIsCartModalOpen(true);
    }

    function handleMouseOut() {
        setIsCartModalOpen(false);
    }

    const menuStyle = {
        boxShadow: 'none',
    };

    return (
        <>
            <Dropdown
                menu={{ items }}
                placement='bottomRight'
                overlayStyle={{ backgroundColor: 'white' }}
                style={{ backgroundColor: 'white' }}
                dropdownRender={menu => (
                    <div className="p-2 min-w-[300px] ring-1 ring-blue-700 rounded-md bg-white">
                        <div className="text-lg font-semibold mb-2 px-2">Giỏ hàng</div>
                        {cartItems.length > 0 ? (
                            <>
                                {React.cloneElement(menu, { style: menuStyle })}
                                <Divider style={{ margin: '8px 0' }} />
                                <div className="flex justify-between my-2 px-2">
                                    <span className="font-medium">Tổng cộng:</span>
                                    <span className="font-bold">
                                        {new Intl.NumberFormat("vi-VN").format(total)}đ
                                    </span>
                                </div>
                                <Button 
                                    type="primary" 
                                    block 
                                    onClick={() => nav('/cart')}
                                >
                                    Xem giỏ hàng và thanh toán
                                </Button>
                            </>
                        ) : (
                            <div className="py-4 text-center text-gray-500">
                                Giỏ hàng trống
                            </div>
                        )}
                    </div>
                )}
            >
                <button
                    className="mx-2 flex items-center bg-blue-800 text-white px-2.5 py-1 rounded-lg text-base hover:bg-white hover:text-blue-800 cursor-pointer"
                    onClick={() => handleClickCart()}
                    onMouseOver={handleMouseIn}
                    onMouseOut={handleMouseOut}
                >
                    Giỏ hàng
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-9"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>
                </button>
            </Dropdown>
        </>
    )
}
