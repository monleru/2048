import findBoxPosition from "./findBoxHorizontalPosition";
import findBoxVeticalPosition from "./findBoxVerticalPosition";
import generateRandom from "./generateRandom";
import getMatrix, {
  addBoxToMatrix,
  changeMatrixBoxPosition,
  getEmptyMatrixCoordinates
} from "./matrix";

function getValue() {
  return Math.random() > 0.75 ? 4 : 2;
}

function getBoxPosition() {
  const emptyCoordinates = getEmptyMatrixCoordinates();
  const randomCoordinateIndex = generateRandom(0, emptyCoordinates.length - 1);

  return emptyCoordinates[randomCoordinateIndex];
}

function createBoxElem() {
  const boxWrapper = document.createElement("div");
  boxWrapper.classList.add("box-wrapper");
  return boxWrapper;
}

class Box {
  constructor() {
    this.id = generateRandom(1, 99999999999);
    this.value = getValue();
    this.position = getBoxPosition();
    this.boxElem = createBoxElem();
  }

  setBoxPosition(newPosition) {
    this.position = newPosition;
  }

  getValue() {
    return this.value;
  }

  changeBoxPosition() {
    const boxX = this.position.x * 25;
    const boxY = this.position.y * 25;

    this.boxElem.style.top = `${boxY}%`;
    this.boxElem.style.left = `${boxX}%`;
  }

  getPosition() {
    return this.position;
  }

  kill() {
    setTimeout(() => {
      this.boxElem.remove();
    }, 100);
  }

  setBoxValue(shouldAddClass = true) {
    this.boxElem.innerHTML = this.value;

    this.boxElem.classList.remove(`number_${this.value / 2}`);
    if (shouldAddClass) {
      this.boxElem.classList.add(`number_${this.value}`);
    }
  }

  mergeBoxValue() {
    this.value = this.value * 2;
    const shouldAddClass = this.value <= 2048;
    setTimeout(() => {
      this.setBoxValue(shouldAddClass);
    }, 100);
  }

  move(moveDirection) {
    //left, up, right, down
    const matrix = getMatrix();
    const { x, y } = this.getPosition();
    switch (moveDirection) {
      case "left": {
        findBoxPosition({
          box: this,
          x,
          y,
          matrix,
          startCondition: (x) => !x,
          endCondition: (currentX) => currentX > 0,
          changeMethod: (currentX) => currentX - 1
        });
        break;
      }
      case "right": {
        findBoxPosition({
          box: this,
          x,
          y,
          matrix,
          startCondition: (x) => x === 3,
          endCondition: (currentX) => currentX < 3,
          changeMethod: (currentX) => currentX + 1
        });
        break;
      }
      case "up": {
        findBoxVeticalPosition({
          box: this,
          x,
          y,
          matrix,
          startCondition: (y) => !y,
          endCondition: (currentY) => currentY > 0,
          changeMethod: (currentY) => currentY - 1
        });
        break;
      }
      case "down": {
        findBoxVeticalPosition({
          box: this,
          x,
          y,
          matrix,
          startCondition: (y) => y === 3,
          endCondition: (currentY) => currentY < 3,
          changeMethod: (currentY) => currentY + 1
        });
        break;
      }
      default:
        console.log("");
    }

    this.changeBoxPosition();
    changeMatrixBoxPosition(this);
  }

  setBoxToScreen() {
    const matrixElem = document.getElementById("matrix");

    this.changeBoxPosition();
    this.setBoxValue();
    addBoxToMatrix(this);

    matrixElem.appendChild(this.boxElem);
  }
}

export default function createBox() {
  const newBox = new Box();
  newBox.setBoxToScreen();
  return newBox;
}
