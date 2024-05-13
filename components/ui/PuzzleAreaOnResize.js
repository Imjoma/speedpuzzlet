import React from "react";

const PuzzleAreaOnResize = ({ handler, src }) => {
  return (
    <>
      <div className="absolute top-0 left-0 z-20 w-full">
        <button
          onClick={handler}
          className="absolute z-20 text-lg font-medium text-white underline -translate-x-1/2 -translate-y-1/2 pointer-events-auto top-1/2 left-1/2"
        >
          Play Again?
        </button>
        <img className="w-full h-full brightness-50" src={src} />
      </div>
    </>
  );
};

export default PuzzleAreaOnResize;
