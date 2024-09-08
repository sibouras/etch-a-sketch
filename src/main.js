// @ts-check
const gridContainer = /** @type {HTMLDivElement} */ (
  document.querySelector('.grid')
)
const range = /** @type {HTMLInputElement} */ (
  document.querySelector('input[type=range]')
)
const rangeSpan = /** @type {HTMLSpanElement} */ (
  document.querySelector('.range-span')
)
const inputColor = /** @type {HTMLInputElement} */ (
  document.querySelector('input[type=color]')
)

let color = inputColor.value

/** @param {number} size  */
function fillGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridContainer.append(gridElement)
  }
}

fillGrid(20)

// using mouseover + mousedown is better than using mousemove.
// mousemove event fires many times per second as the mouse is moved around, even
// if it is just by one pixel.
// also we use preventDefault() on the drag/drop operation in mousedown,
// or we can add `user-select: none` in css(both fix the element drag).

gridContainer.addEventListener('mouseover', (e) => {
  if (
    e.target instanceof HTMLDivElement && // this gives lsp completion to e.target
    e.target.classList.contains('grid-element') &&
    e.buttons === 1 // 1 means left button is pressed
  ) {
    e.target.style.backgroundColor = color
  }
})

gridContainer.addEventListener('mousedown', (e) => {
  // prevent drag/drop operation: https://w3c.github.io/uievents/#event-type-mousedown
  // e.preventDefault() // not using this because im using `user-select:none` in css
  if (
    e.target instanceof HTMLDivElement &&
    e.target.classList.contains('grid-element') &&
    e.buttons === 1
  ) {
    e.target.style.backgroundColor = color
  }
})

range.addEventListener('input', (e) => {
  const target = /** @type {HTMLInputElement} */ (e.target)
  rangeSpan.textContent = `${target.value} x ${target.value}`
})

range.addEventListener('change', (e) => {
  const target = /** @type {HTMLInputElement} */ (e.target)
  gridContainer.innerHTML = ''
  fillGrid(target.valueAsNumber)
})

inputColor.addEventListener('input', (e) => {
  const target = /** @type {HTMLInputElement} */ (e.target)
  color = target.value
})
