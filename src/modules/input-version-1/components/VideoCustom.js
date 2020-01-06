import React from 'react';

const VideoCustom = ({ item }) => {
  return (
    <div align="center">
      <video key={item.data.src} controls>
        <source src={item.data.src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoCustom;
