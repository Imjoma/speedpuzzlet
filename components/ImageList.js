import React from "react";

const ImageList = ({ imageList, setImageId }) => {
  return (
    <div className="absolute bottom-0 z-50 flex flex-row gap-4 -translate-x-1/2 -translate-y-12 sm:gap-8 left-1/2">
      {imageList.map((item, idx) => (
        <div
          onClick={() => setImageId(idx)}
          className="w-12 h-12 overflow-hidden duration-300 rounded-md hover:ring-4 ring-green-500 hover:scale-125"
          key={idx}
        >
          <img
            className="rounded-md hover:scale-90"
            src={`/.netlify/images?url=${item.image}&fit=cover&w=64&h=64&position=center&q=50&fm=avif`}
            alt={item.alt.split("-").join(" ")}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
