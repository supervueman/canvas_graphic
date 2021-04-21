const WIDTH = 600;
const HEIGHT = 200;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;

function chart(canvas, data) {
  const ctx = canvas.getContext('2d');

  canvas.style.width = `${WIDTH}px`;
  canvas.style.height = `${HEIGHT}px`;
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;


}

chart(document.getElementById('chart'), [[0, 0], [200, 100], [400, 50]]);