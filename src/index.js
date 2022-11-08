import createBox from "./utils/createBox";
import createListeners from "./utils/listeners";

function startGame() {
  createListeners();
  createBox();
  createBox();
}

startGame();
