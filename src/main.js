/** @type {HTMLDivElement} */
const gridContainer = document.querySelector('.grid')
/** @type {HTMLInputElement} */
const range = document.querySelector('input[type="range"]')
const rangeSpan = document.querySelector('.range-span')

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
    e.target.style.backgroundColor = 'blue'
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
    e.target.style.backgroundColor = 'blue'
  }
})

range.addEventListener('input', (e) => {
  /** @type {HTMLInputElement} */
  const target = e.target
  rangeSpan.textContent = `${target.value} x ${target.value}`
})

range.addEventListener('change', (e) => {
  /** @type {HTMLInputElement} */
  const target = e.target
  gridContainer.innerHTML = ''
  fillGrid(target.value)
})
