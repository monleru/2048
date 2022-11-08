import createBox from "./createBox";
import getMatrix from "./matrix";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import gameOver from "./gameOver";

export default function moveMatrixElements(moveDirection) {
  // left, up, right, down
  const matrix = getMatrix();
  const oldMatrix = cloneDeep(matrix);

  if (moveDirection === "left") {
    for (let index = 1; index < matrix.length; index++) {
      matrix.forEach((matrixLine) => {
        const box = matrixLine[index];
        if (box) {
          box.move(moveDirection);
        }
      });
    }
  } else if (moveDirection === "right") {
    for (let index = matrix.length - 2; index > -1; index--) {
      matrix.forEach((matrixLine) => {
        const box = matrixLine[index];
        if (box) {
          box.move(moveDirection);
        }
      });
    }
  } else if (moveDirection === "up") {
    matrix.forEach((matrixLine) => {
      matrixLine.forEach((box) => {
        if (box) {
          box.move(moveDirection);
        }
      });
    });
  } else if (moveDirection === "down") {
    for (let index = matrix.length - 2; index > -1; index--) {
      matrix[index].forEach((box) => {
        if (box) {
          box.move(moveDirection);
        }
      });
    }
  }

  const isSameMatrix = isEqual(oldMatrix, matrix);
  if (!isSameMatrix) {
    createBox();

    const isGameOver = gameOver(matrix);

    if (isGameOver) {
      const errorDiv = document.createElement("div");
      errorDiv.innerHTML = "GAMA OVER";
      errorDiv.classList.add("error-div");

      document.getElementById("app").appendChild(errorDiv);
    }
  }
}
