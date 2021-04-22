export function toDate(timestamp) {
  const shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(timestamp);

  return `${shortMonths[date.getMonth()]} ${date.getDate()}`;
}

export function isOver(mouse, x, length, dWidth) {
  if (!mouse) return false;

  const width = dWidth / length;
  return Math.abs(x - mouse.x) < width / 2;
}

export function line(ctx, coords, { color }) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;

  for (const [x, y] of coords) {
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.closePath();
}
