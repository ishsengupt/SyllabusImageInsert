import React, { useState } from "react";
import { VideoItem } from "./VideoItem";
export const VideoList = ({ videos, setSelectedVideo }) => {
  const [open, setOpen] = useState(false);

  let renderedList;
  if (open) {
    renderedList = videos.map((video, index) => {
      if (video.id.kind !== "youtube#channel") {
        return (
          <VideoItem
            video={video}
            key={index}
            setSelectedVideo={setSelectedVideo}
          />
        );
      }
    });
  } else if (!open) {
    renderedList = (
      <VideoItem
        video={videos[0]}
        key={1}
        setSelectedVideo={setSelectedVideo}
      />
    );
  }

  return (
    <div className="ui relaxed divided list">
      {renderedList}
      <button className="toggle__button" onClick={() => setOpen(!open)}>
        Toggle
      </button>
    </div>
  );
};
