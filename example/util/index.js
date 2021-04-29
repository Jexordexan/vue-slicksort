export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function range(length) {
  return Array(length)
    .fill()
    .map((_, i) => i);
}
