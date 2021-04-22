import { css, boundaries, toCoords, line } from './utils';

const HEIGHT = 40;
const DPI_HEIGHT = HEIGHT * 2;

export function sliderChart(root, data, DPI_WIDTH) {
  const WIDTH = DPI_WIDTH / 2;
  const MIN_WIDTH = WIDTH * 0.05;
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  css(canvas, {
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
  });

  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  const $left = root.querySelector('[data-el="left"]');
  const $window = root.querySelector('[data-el="window"]');
  const $right = root.querySelector('[data-el="right"]');

  function mousedown(event) {
    const type = event.target.dataset.type;
    const dimensions = {
      left: parseInt($window.style.left),
      right: parseInt($window.style.right),
      width: parseInt($window.style.width),
    };

    if (type === 'window') {
      const startX = event.pageX;
      document.onmousemove = e => {
        const delta = startX - e.pageX;

        if (delta === 0) {
          return;
        }
        const left = dimensions.left - delta;
        const right = WIDTH - dimensions.width - left;

        setPosition(left, right);
      }
    }
  }

  function mouseup() {
    document.onmousemove = null;
  }

  root.addEventListener('mousedown', mousedown);

  document.addEventListener('mouseup', mouseup)

  const defaultWidth = WIDTH * 0.3;
  setPosition(0, WIDTH - defaultWidth);

  function setPosition(left, right) {
    const w = WIDTH - right - left;

    if (w < MIN_WIDTH) {
      css($window, {
        width: `${MIN_WIDTH}px`,
      });
      return;
    }

    if (left < 0) {
      css($window, { left: '0px' });
      css($left, { width: '0px' });
      return;
    }

    if (right < 0) {
      css($window, { left: '0px' });
      css($right, { width: '0px' });
      return;
    }

    css($window, {
      width: `${w}px`,
      left: `${left}px`,
      right: `${right}px`,
    });
    css($right, { width: `${right}px`});
    css($left, { width: `${left}px`});
  }

  const [yMin, yMax] = boundaries(data);
  const yRatio = DPI_HEIGHT / (yMax - yMin);
  const xRatio = DPI_WIDTH / (data.columns[0].length - 2);

  const yData = data.columns.filter(col => data.types[col[0]] === 'line');

  yData.map(toCoords(xRatio, yRatio, DPI_HEIGHT, -5)).forEach((coords, i) => {
    const color = data.colors[yData[i][0]];
    line(ctx, coords, { color });
  });
}
