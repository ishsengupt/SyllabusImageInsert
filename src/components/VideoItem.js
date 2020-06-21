import React from "react";
import "./VideoItem.css";

export const VideoItem = ({ video, index, setSelectedVideo }) => {
  return (
    <div className="flex__row border__item__large card ">
      <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        className="no-underlines"
      >
        <img
          className="ui image youtube__image"
          src={video.snippet.thumbnails.medium.url}
        />
      </a>

      <div className="content padding__left">
        <div className="header padding__sides">{video.snippet.title}</div>
        <div className="description">{video.snippet.description}</div>
      </div>
    </div>
  );
};
