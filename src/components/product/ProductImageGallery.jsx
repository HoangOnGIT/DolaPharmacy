import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

function ProductImageGallery({ imgArr }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <main className="product-gallery">
      {/* Main Swiper */}
      <Swiper
        style={{
          "--swiper-navigation-color": "oklch(42.4% 0.199 265.638)",
          "--swiper-pagination-color": "oklch(42.4% 0.199 265.638)",
          marginBottom: "10px",
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="main-swiper"
      >
        {imgArr.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Product image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumb-swiper [&_.swiper-slide-thumb-active]:ring-2 [&_.swiper-slide-thumb-active]:ring-blue-800"
      >
        {imgArr.map((image, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer transition-all duration-300 ease-in-out m-1"
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-slide-thumb-active {
          opacity: 1;
          border-radius: 4px;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}

export default ProductImageGallery;
