import React from "react";

const PuzzleAreaOnResize = ({ src }) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-20 w-full">
        <img className="w-full h-full brightness-50" src={src} />
      </div>
    </>
  );
};

export default PuzzleAreaOnResize;
