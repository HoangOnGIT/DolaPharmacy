import React from "react";
import InfoCard from "./InfoCard";

function ProductSidebar({ infoCardData }) {
  return (
    <div className="col-span-1 md:col-span-2 space-y-5">
      <div className="bg-white rounded-lg shadow-md border-2 border-blue-100 p-4 text-center">
        <h3 className="font-bold text-blue-800 text-sm mb-3">
          CHÚNG TÔI LUÔN SẴN SÀNG ĐỂ GIÚP ĐỠ BẠN
        </h3>
        <img
          src="https://res.cloudinary.com/ds2dbvq5h/image/upload/v1744085626/pngtree-remote-work-in-action-man-on-video-conference-call-png-image_15059907_vbj8zw.png"
          className="w-3/4 mx-auto my-3"
          alt="Support"
        />
        <p className="text-sm font-medium mb-2">
          Để được hỗ trợ tốt nhất. Hãy gọi:
        </p>
        <p className="text-blue-700 text-2xl font-bold mb-3">1900 6750</p>
        <div className="w-full h-px bg-gray-300 my-3"></div>
        <p className="text-sm mb-2">Hoặc:</p>
        <p className="text-sm mb-4">Chat hỗ trợ trực tuyến</p>
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-green-500  !text-white text-sm font-medium rounded-md shadow transition-colors">
          Chat với chúng tôi
        </button>
      </div>

      {infoCardData.map((item, index) => (
        <InfoCard
          key={index}
          title={item.title}
          content={item.content}
          iconPath={item.iconPath}
        />
      ))}
    </div>
  );
}

export default ProductSidebar;
