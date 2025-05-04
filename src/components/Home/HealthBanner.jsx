import React, { useState, useEffect } from 'react';
import img1 from '../../img/Header/BannerHealth1.png';
import img2 from '../../img/Header/BannerHealth2.png';

const HealthBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: img1, link: '/shop/banner1' },
    { image: img2, link: '/shop/banner2' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    console.log('Button clicked, switching to slide:', index);
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-100 w-full mx-auto mb-8">
      {/* Slide Content */}
      <div className="h-full w-full overflow-hidden">
        <a href={slides[currentSlide].link} className="block h-full w-full">
          <img
            src={slides[currentSlide].image}
            alt={`Banner ${currentSlide + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </a>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
            } hover:bg-blue-400 transition`}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthBanner;