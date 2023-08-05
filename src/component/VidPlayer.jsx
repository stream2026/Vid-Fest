import React from "react";


// taking the video object connecting to the temp data
const VidPlayer = ({ video }) => {

  if(!video){
    return (
      <h1>NO VIDEO FOUND</h1>
    )
  }

  return (
    <iframe
      title={video.name}
      src={video.video}
      className="w-11/12 self-center"
      style={{
        aspectRatio: "640 / 360",
      }}
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
    >

    </iframe>
  );
};

export default VidPlayer;
