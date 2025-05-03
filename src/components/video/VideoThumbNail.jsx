import React, { useState } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import VideoPlayer from "./VideoPlayer";

function VideoThumbNail({ urlObj }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showModal() {
    setIsModalOpen(true);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }
  console.log(urlObj.url);
  return (
    <>
      <div>
        <div
          onClick={() => showModal()}
          className="col-span-1 relative flex items-center justify-center cursor-pointer group transition-all duration-200"
        >
          <img
            src={urlObj.url}
            alt={urlObj.title}
            className="rounded-lg shadow-sm object-cover w-full hover:ring-2 hover:ring-blue-700 transition-all duration-200"
          />
          <div className="absolute inset-0 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-200 rounded-lg">
            <PlayCircleOutlined
              className="text-white text-5xl opacity-80 group-hover:opacity-100 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200"
              style={{ color: "white" }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-700 font-medium block text-center mt-1">
          {urlObj.title}
        </span>
      </div>
      <Modal
        title={
          <div className="text-lg font-medium text-blue-800">
            {urlObj.title}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="auto"
        style={{ maxWidth: "90vw", margin: "0 auto" }}
        centered
        destroyOnClose={true}
        className="video-modal"
        bodyStyle={{ padding: 0, height: "auto" }}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      >
        <div
          className="video-player-container w-full rounded-lg overflow-hidden"
          style={{
            maxHeight: "85vh",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <VideoPlayer title={urlObj.title} url={urlObj.videoUrl} />
        </div>
      </Modal>
    </>
  );
}

export default VideoThumbNail;
