import React from "react";

const PuzzleAreaBackground = () => {
  return (
    <div className="absolute flex flex-col gap-20 -rotate-45 -translate-x-1/2 -translate-y-1/2 opacity-20 top-1/2 left-1/2">
      {[...Array(6).keys()].map((i, idx) => (
        <img
          key={idx}
          src="/assets/logo.svg"
          className={`${i % 2 === 0 && "translate-x-1/2"} scale-[400%]  `}
          alt=""
        />
      ))}
    </div>
  );
};

export default PuzzleAreaBackground;
