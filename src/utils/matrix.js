const matrix = Array.from({ length: 4 }, () =>
  Array.from({ length: 4 }, () => 0)
);

export function getEmptyMatrixCoordinates() {
  return matrix.reduce((emptyCoordinates, matrixLine, y) => {
    matrixLine.forEach((elem, x) => {
      if (!elem) {
        emptyCoordinates.push({ x, y });
      }
    });

    return emptyCoordinates;
  }, []);
}

export function addBoxToMatrix(box) {
  const { x, y } = box.getPosition();
  matrix[y][x] = box;
}

export function changeMatrixBoxPosition(box) {
  const { id: boxId } = box;
  const { x, y } = box.getPosition();
  let oldBoxPosition = null;

  matrix.forEach((matrixLine, matrixY) =>
    matrixLine.forEach((matrixElem, matrixX) => {
      if (matrixElem && matrixElem.id === boxId) {
        oldBoxPosition = {
          x: matrixX,
          y: matrixY
        };
      }
    })
  );

  if (oldBoxPosition && (oldBoxPosition.x !== x || oldBoxPosition.y !== y)) {
    matrix[y][x] = box;
    matrix[oldBoxPosition.y][oldBoxPosition.x] = 0;
  }
}

export default function getMatrix() {
  return matrix;
}
