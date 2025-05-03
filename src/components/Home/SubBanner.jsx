import React, { useState, useEffect } from 'react';
import img1 from '../../img/Header/BannerHealth3.png';
import img2 from '../../img/Header/BannerHealth4.png';

const SubBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    return (
        <div className="relative  w-full mx-auto my-10 flex gap-4">
            {/* Slide Content */}
            <div className="h-full w-[50%] overflow-hidden">
                <a href="#" className="block h-full w-full">
                    <img
                        src={img1}
                        alt=""
                        className="w-full h-[75%] object-cover rounded-lg"
                    />
                </a>
            </div>
            <div className="h-full w-[50%] overflow-hidden">
                <a href="#" className="block h-full w-full">
                    <img
                        src={img2}
                        alt=""
                        className="w-full h-[75%] object-cover rounded-lg"
                    />
                </a>
            </div>
        </div>
    );
}

export default SubBanner;
