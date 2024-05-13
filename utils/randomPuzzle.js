export const randomPuzzle = (arr, setPuzzlePieces) => {
  let newArr = [];
  for (let i = 1; i <= arr.length; i++) {
    const random = Math.floor(Math.random() * arr.length);
    const isDuplicate = newArr.includes(arr[random]);

    if (!isDuplicate) {
      newArr.push(arr[random]);
    } else {
      i--;
    }
  }

  const modifiedArray = newArr.map((item, idx) => {
    return { ...item, playId: idx + 1 };
  });

  setPuzzlePieces(modifiedArray);
};
