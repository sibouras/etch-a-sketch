/** @type {HTMLDivElement} */
const gridContainer = document.querySelector('.grid')

function fillGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    // gridElement.addEventListener('click', (e) => {
    //   /** @type {HTMLDivElement} */
    //   const target = e.target
    //   target.style.backgroundColor = 'red'
    // })
    gridContainer.append(gridElement)
  }
}

fillGrid(8)

gridContainer.addEventListener('click', (e) => {
  if (
    e.target instanceof HTMLDivElement &&
    e.target.classList.contains('grid-element')
  ) {
    e.target.style.backgroundColor = 'blue'
  }
})
