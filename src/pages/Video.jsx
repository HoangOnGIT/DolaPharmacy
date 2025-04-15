import VideoThumbNail from "../components/VideoThumbNail";

function Video() {
  const imgArr = [
    {
      url: "https://picsum.photos/id/237/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/239/200/150",
      title: "Falling behind // thought you wanted to dance - transition",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744194752/falling_behind_thought_you_wanted_to_dance_-_transition_ocnhgw.mp4",
    },
    {
      url: "https://picsum.photos/id/254/200/150",
      title: "Ngọt - LẦN CUỐI (đi bên em xót xa người ơi)",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/241/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/653/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
    {
      url: "https://picsum.photos/id/143/200/150",
      title: "Hà Nội - Obito ft. VSTRA (rmx) | Remake",
      videoUrl:
        "https://res.cloudinary.com/ds2dbvq5h/video/upload/v1744191734/H%C3%A0_N%E1%BB%99i_-_Obito_ft._VSTRA_rmx_Remake_xlvieb.mp4",
    },
  ];

  return (
    <div
      style={{ width: "100%" }}
      className="flex items-center justify-center mt-10"
    >
      <div className="w-[70%] grid grid-cols-9 min-h-screen">
        <div className="col-span-7">
          <h1 className="font-semibold text-2xl">Video</h1>
          <div className="grid grid-cols-3 gap-10">
            {imgArr.map((url) => (
              <VideoThumbNail urlObj={url} key={url.url} />
            ))}
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

export default Video;
