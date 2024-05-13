export const handleSwap = (
  id,
  selectA,
  setSelectA,
  puzzlePieces,
  setPuzzlePieces
) => {
  let temp = id;
  if (selectA !== null) {
    if (selectA === temp) {
      return setSelectA(null);
    }
    // Do the swap:
    const newPuzzlePieces = puzzlePieces.map((item) => {
      if (item.playId === selectA) {
        return { ...item, playId: temp };
      }
      if (item.playId === temp) {
        return { ...item, playId: selectA };
      }
      return item;
    });
    // change the initial array
    setPuzzlePieces([...newPuzzlePieces]);
    // clear the state after successful swap
    setSelectA(null);
  } else {
    // Ready the first value
    setSelectA(temp);
  }
};
