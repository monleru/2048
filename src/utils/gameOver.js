const isAllowedMatrixElem = (box) => (matrixElem) => {
  return (
    typeof matrixElem !== "undefined" &&
    (matrixElem === 0 || matrixElem?.getValue() === box?.getValue())
  );
};

export default function gameOver(matrix) {
  const isGameOver = !matrix.some((matrixLine, y) => {
    return matrixLine.some((matrixElem, x) => {
      const leftElem = matrix[y]?.[x - 1];
      const rightElem = matrix[y]?.[x + 1];
      const upElem = matrix[y - 1]?.[x];
      const downElem = matrix[y + 1]?.[x];

      const canBeMoved = matrixElem
        ? [leftElem, rightElem, upElem, downElem].some(
            isAllowedMatrixElem(matrixElem)
          )
        : true;

      return canBeMoved;
    });
  });

  return isGameOver;
}
