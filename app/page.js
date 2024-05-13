"use client";

import { useEffect, useState } from "react";
import { puzzlePieces as originalArray } from "@/constant/puzzlePieces";
import { imageList } from "@/constant/imageList";

import PuzzleAreaOnResize from "@/components/ui/PuzzleAreaOnResize";
import PuzzleAreaBackground from "@/components/ui/PuzzleAreaBackground";

import { handleSwap } from "@/utils/handleSwap";
import { handleChecking } from "@/utils/handleChecking";
import { randomPuzzle } from "@/utils/randomPuzzle";
import ImageList from "@/components/ImageList";

export default function Home() {
  const [selectA, setSelectA] = useState(null);
  const [forceClose, setForceClose] = useState(false);
  const [display, setDisplay] = useState(true);
  const [gameStart, setGameStart] = useState({
    start: false,
    count: 10,
  });
  const [complete, setComplete] = useState({
    message: "Hooray",
  });
  const [puzzlePieces, setPuzzlePieces] = useState(originalArray);
  const [imageSize, setImageSize] = useState(null);
  const [imageId, setImageId] = useState(1);
  const [position, setPosition] = useState("center");

  // For resizing and initial render
  useEffect(() => {
    if (window.innerWidth <= 680) {
      setImageSize(window.innerWidth - 80);
    } else {
      setImageSize(600);
    }

    window.onresize = () => {
      setForceClose(true);
      if (window.innerWidth <= 680) {
        setDisplay(false);
        setImageSize(window.innerWidth - 80);
      } else {
        setDisplay(true);
        setImageSize(600);
      }
    };
  });

  const handleSetDisplay = (newSize) => {
    setComplete({ message: null });
    setDisplay(true);
    setImageSize(newSize);
    // ------------

    setGameStart({ ...gameStart, start: true });
    randomPuzzle(originalArray, setPuzzlePieces);
  };

  useEffect(() => {
    if (gameStart.count <= 0) {
      handleChecking(puzzlePieces, setGameStart, setComplete);
      return setGameStart({ count: 10, start: false });
    }

    //Implementing the setInterval method
    const interval =
      gameStart.start === true &&
      setInterval(() => {
        setGameStart({ ...gameStart, count: gameStart.count - 1 });
      }, 1000);

    // force reset
    if (forceClose === true) {
      setForceClose(false);
      setSelectA(null);
      clearInterval(interval);
      return setGameStart({ count: 10, start: false });
    }

    //   reset
    if (gameStart.start === false || gameStart.count === 0) {
      setSelectA(null);
      clearInterval(interval);
      return setGameStart({ count: 10, start: false });
    }

    //Clearing the interval
    return () => clearInterval(interval);
  }, [gameStart.count, gameStart.start, forceClose]);

  const parentGridSize = "w-[" + imageSize + "px] h-[" + imageSize + "px]";
  const remoteSrc = `https://imageground.netlify.app/.netlify/images?url=https://ik.imagekit.io/unburn/temp/38825852-c724-48f5-aac7-a9547ec08407_RPBaa1UJ2.png&fit=cover&w=${imageSize}&h=${imageSize}&position=right&q=50&fm=avif`;

  const imageSrc = `/.netlify/images?url=${imageList[imageId].image}&fit=cover&w=${imageSize}&h=${imageSize}&position=${position}&q=50&fm=avif`;
  const onBlurSrc = `/.netlify/images?url=${imageList[imageId].image}&fit=cover&w=200&h=200&position=${position}&q=20&fm=avif`;

  const positionList =
    imageList[imageId].tag === "portrait"
      ? [
          { name: "top", icon: "⬆️" },
          { name: "center", icon: "↕️" },

          { name: "bottom", icon: "⬇️" },
        ]
      : [
          { name: "left", icon: "⬅️" },

          { name: "center", icon: " ↔️" },
          { name: "right", icon: "➡️" },
        ];

  return (
    <main className="max-w-5xl p-4 mx-auto ">
      {/* Puzzle Area */}
      <section
        id="puzzle-container"
        className="relative p-3 border-4 max-w-[640px] mx-auto border-black border-dashed  aspect-square rounded-xl lg:rounded-3xl"
      >
        {/* Images */}
        {gameStart.start === false && (
          <ImageList imageList={imageList} setImageId={setImageId} />
        )}

        {/* Counter */}
        {gameStart.start && (
          <h1 className="absolute top-0 z-50 text-6xl font-extrabold text-[#78B447] scale-150 -translate-x-1/2 -translate-y-1/2 left-1/2">
            {gameStart.count}
          </h1>
        )}
        {/* Message */}
        <div className="absolute z-50 p-4 text-4xl font-semibold text-white scale-150 -translate-x-1/2 top-1/2 -rotate-12 left-1/2">
          {complete.message}
        </div>

        {/* Puzzle Grid */}
        <div
          className={`relative ${parentGridSize} ${
            gameStart.start === true
              ? "pointer-events-auto"
              : "pointer-events-none"
          }  gap-1 grid grid-cols-3 grid-rows-3`}
        >
          {gameStart.start === false && (
            <div
              className={`absolute top-0 left-0 z-20 w-full overflow-hidden ${
                imageSize === null ? "bg-[#78B447]" : "bg-black"
              }  bg-opacity-50 aspect-square rounded-xl`}
            >
              <>
                {imageSize === null && <PuzzleAreaBackground />}
                {!display && (
                  <PuzzleAreaOnResize
                    handler={() => handleSetDisplay(imageSize)}
                    src={onBlurSrc}
                  />
                )}
              </>
            </div>
          )}

          {display &&
            imageSize !== null &&
            puzzlePieces
              .sort((a, b) => a.playId - b.playId)
              .map((item, idx) => (
                <div
                  className={`relative overflow-hidden  
                  ${idx === 0 && "rounded-tl-xl"}
                  ${idx === 2 && "rounded-tr-xl"}
                  ${idx === 6 && "rounded-bl-xl"}
                  ${idx === 8 && "rounded-br-xl"}
                  `}
                  key={item.id}
                  onClick={() =>
                    handleSwap(
                      item.playId,
                      selectA,
                      setSelectA,
                      puzzlePieces,
                      setPuzzlePieces
                    )
                  }
                >
                  <img
                    src={imageSrc}
                    key={item.id}
                    className={`
                    duration-100    
                    ${
                      selectA === item.playId
                        ? "scale-90 ring-4 ring-[#78B447] ring-offset-4"
                        : ""
                    } ${item?.ps}  object-none`}
                  />
                  <span className="absolute text-[8px] w-3 h-3 flex items-center justify-center text-white scale-150 bg-black rounded-full top-2 left-2 ">
                    {item.id}
                  </span>
                </div>
              ))}
        </div>
      </section>
      {/* Controllers */}
      <div className="flex flex-row justify-between items-center max-w-[640px] mx-auto">
        {/* play and stop */}
        <div className="flex flex-row gap-4 p-4 font-medium text-white ">
          {gameStart.start === false ? (
            <button
              onClick={() => handleSetDisplay(imageSize)}
              className="py-4  px-6  bg-[#78B447] rounded-md text-lg"
            >
              Play
            </button>
          ) : (
            <button
              onClick={() => setForceClose(true)}
              className="px-6 py-4 text-lg bg-red-500 rounded-md"
            >
              Stop
            </button>
          )}
        </div>
        {/* positions */}
        <div className="flex flex-row gap-4 p-4">
          {positionList.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setPosition(item.name)}
              className={`${
                item.name === position ? "bg-[#78B447]" : "bg-slate-200"
              } p-4 text-lg rounded-md  `}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
