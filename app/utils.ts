export const getBoundedValue = (
  newValue: number,
  minLimit = 0,
  maxLimit = 0,
) => {
  return Math.min(Math.max(minLimit, newValue), maxLimit);
};
