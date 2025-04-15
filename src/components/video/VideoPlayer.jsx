import React, { useEffect, useRef, useState } from "react";
import cloudinary from "cloudinary-video-player";
import "cloudinary-video-player/cld-video-player.min.css";

function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !videoRef.current || !url) return;

    try {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      playerRef.current = cloudinary.videoPlayer(videoRef.current, {
        cloud_name: "ds2dbvq5h",
        secure: true,
        controls: true,
        autoplayMode: "never",
      });

      if (playerRef.current && url) {
        playerRef.current.source(url);
      }
    } catch (error) {
      console.error("Error initializing video player:", error);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          console.error("Error disposing player:", e);
        }
      }
    };
  }, [url, isReady]);

  return (
    <div className="video-container relative w-full">
      <video
        ref={videoRef}
        className="cld-video-player w-full"
        controls
        muted
        preload="auto"
        style={{
          maxHeight: "85vh",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default VideoPlayer;
