const gridContainer = document.querySelector("#grid-container");
const clearButton = document.querySelector(".clear");
const colorButtons = document.querySelectorAll(".color-choice");
const userColorPicker = document.querySelector("#input-color");
let slider = document.querySelector("#sizeRange");
let color = "black";

function createGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  fillGrid(size);
}

function fillGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList = "grid-element";
    gridElement.addEventListener("mouseover", colorGrid);
    gridContainer.appendChild(gridElement);
  }
}

function colorGrid() {
  switch (color) {
    case "rainbow":
      // const randomR = Math.floor(Math.random() * 256);
      // const randomG = Math.floor(Math.random() * 256);
      // const randomB = Math.floor(Math.random() * 256);
      // e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB}`;
      this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      break;
    case "eraser":
      this.style.backgroundColor = "#fff";
      break;
    case "black":
      this.style.backgroundColor = "#000";
      break;
    default:
      this.style.backgroundColor = color;
      break;
  }
}

// Updates color variable when a color button is clicked
function changeColor(e) {
  switch (e.target.dataset.color) {
    case "rainbow":
      color = "rainbow";
      break;
    case "gray":
      color = "gray";
      break;
    case "eraser":
      color = "eraser";
      break;
    default:
      color = "black";
      break;
  }
}

function userColorSelection(e) {
  color = e.target.value;
}

function clearGrid() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.lastChild);
  }
}

// Clear Button
function eraseAllColor() {
  let gridPixels = gridContainer.querySelectorAll("div");
  gridPixels.forEach((gridPixel) => (gridPixel.style.backgroundColor = "#fff"));
}

function pixelSize() {
  let gridPixels = gridContainer.querySelectorAll("div");
  gridPixels.forEach((gridPixel) => gridPixel.remove());
  createGrid(slider.value);
}

// On Page Load - default size
createGrid(16);

// Event Listeners
clearButton.addEventListener("click", eraseAllColor);
colorButtons.forEach((colorButton) =>
  colorButton.addEventListener("click", changeColor)
);
userColorPicker.addEventListener("input", userColorSelection);
slider.addEventListener("mouseup", pixelSize);
