import moveMatrixElements from "./moveMatricsElements";

const listeners = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

export default function createListeners() {
  document.addEventListener("keydown", (event) => {
    moveMatrixElements(listeners[event.keyCode]);
  });
}
