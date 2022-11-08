export default function findBoxVeticalPosition({
  matrix,
  startCondition,
  x,
  y,
  changeMethod,
  endCondition,
  box
}) {
  if (startCondition(y)) {
    return;
  }
  const matrixColumn = matrix.map((matrixLine) => {
    return matrixLine[x];
  });
  let currentY = y;
  let foundY = y;
  do {
    currentY = changeMethod(currentY);
    const anotherBox = matrixColumn[currentY];
    if (anotherBox) {
      if (anotherBox.getValue() === box.getValue()) {
        foundY = currentY;
        box.mergeBoxValue();
        anotherBox.kill();
      }
      break;
    } else {
      foundY = currentY;
    }
  } while (endCondition(currentY));
  box.setBoxPosition({
    x,
    y: foundY
  });
}
