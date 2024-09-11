export const range = (start: number = 0, end: number): number[] => {
  return [...Array(end - start + 1).keys()].map((x) => x + start);
};
