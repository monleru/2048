export default function findBoxHorizontalPosition({
  matrix,
  startCondition,
  x,
  y,
  changeMethod,
  endCondition,
  box
}) {
  if (startCondition(x)) return;
  const boxLine = matrix[y];
  let currentX = x;
  let foundX = x;
  do {
    currentX = changeMethod(currentX);
    const anotherBox = boxLine[currentX];

    if (anotherBox) {
      if (anotherBox.getValue() === box.getValue()) {
        foundX = currentX;
        box.mergeBoxValue();
        anotherBox.kill();
      }

      break;
    } else {
      foundX = currentX;
    }
  } while (endCondition(currentX));
  box.setBoxPosition({
    x: foundX,
    y
  });
}
