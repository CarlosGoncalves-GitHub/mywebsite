const container = document.querySelector('.grid-container');
const rows = 65; // Adjust number of rows
const cols = 65; // Adjust number of columns

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const circle = document.createElement('div');
    circle.classList.add('grid-cell');
    container.appendChild(circle);
  }
}
