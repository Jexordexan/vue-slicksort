export const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b) + 1;
  return lower + Math.floor(Math.random() * (upper - lower));
};

export const range = (length) => Array.from({ length }, (_, i) => i);

export const uid = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const stringsToItems = (arr) => {
  return arr.map((item) => {
    return {
      id: uid(),
      value: item,
    };
  });
};

export const track = (...args) => {
  if (typeof gtag !== 'undefined') {
    gtag(...args);
  }
};
