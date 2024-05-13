export const handleChecking = (puzzlePieces, setGameStart, setComplete) => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let correct = 0;

  for (let i = 0; i < num.length; i++) {
    const isCorrect = num[i] === puzzlePieces[i].id;
    if (isCorrect) {
      correct++;
    }
  }

  if (correct === 9) {
    setGameStart({
      start: false,
      count: 10,
    });
    console.log("Hooray");
    setComplete({ message: "Nice.." });
  } else {
    console.log("Failed");
    setComplete({ message: "Failed" });
  }
};
