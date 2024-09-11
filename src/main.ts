const gridContainer = document.querySelector('.grid') as HTMLDivElement
const range = document.querySelector('input[type=range]') as HTMLInputElement
const rangeSpan = document.querySelector('.range-span') as HTMLSpanElement
const inputColor = document.querySelector(
  'input[type=color]',
) as HTMLInputElement
const darkenBtn = document.querySelector('#darken') as HTMLButtonElement

let inputHexColor = inputColor.value
let currentMode = 'color'

function fillGrid(size: number) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div')
    cell.classList.add('grid-element')
    cell.dataset.darken = '1' // keep track of current step (0-9) for 'Incrementally darken'
    gridContainer.append(cell)
  }
}

fillGrid(20)

// using mouseover + mousedown is better than using mousemove.
// mousemove event fires many times per second as the mouse is moved around, even
// if it is just by one pixel.
// also we use preventDefault() on the drag/drop operation in mousedown,
// or we can add `user-select: none` in css(both fix the element drag).

function handleMouseDown(e: MouseEvent) {
  const cell = e.target
  if (
    cell instanceof HTMLDivElement &&
    cell.classList.contains('grid-element') &&
    e.buttons === 1 // 1 means left button is pressed
  ) {
    if (currentMode === 'color') {
      cell.style.backgroundColor = inputHexColor
      cell.dataset.darken = '1' // reset the opacity
      return
    }

    const darkenValue = Number.parseFloat(cell.dataset.darken as string)
    // the cell needs to be colored to darken it
    if (
      currentMode === 'darken' &&
      cell.style.backgroundColor &&
      darkenValue > 0
    ) {
      cell.dataset.darken = (darkenValue - 0.1).toFixed(1)
      const backgroundColor = cell.style.backgroundColor
      const [r, g, b] = backgroundColor.match(/\.?\d+/g) || []
      // use rgba instead of opacity because opacity applies to borders
      cell.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${cell.dataset.darken})`
      cell.dataset.hexColor = inputHexColor
    }
  }
}

gridContainer.addEventListener('mouseover', (e) => {
  handleMouseDown(e)
})

gridContainer.addEventListener('mousedown', (e) => {
  // prevent drag/drop operation: https://w3c.github.io/uievents/#event-type-mousedown
  // e.preventDefault() // not using this because im using `user-select:none` in css
  handleMouseDown(e)
})

range.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement
  rangeSpan.textContent = `${target.value} x ${target.value}`
})

range.addEventListener('change', (e) => {
  gridContainer.innerHTML = ''
  fillGrid((e.target as HTMLInputElement).valueAsNumber)
})

inputColor.addEventListener('input', (e) => {
  inputHexColor = (e.target as HTMLInputElement).value
  currentMode = 'color'
  darkenBtn.classList.remove('active')
})

darkenBtn.addEventListener('click', () => {
  if (currentMode === 'color') {
    currentMode = 'darken'
    darkenBtn.classList.add('active')
  } else {
    currentMode = 'color'
    darkenBtn.classList.remove('active')
  }
})
