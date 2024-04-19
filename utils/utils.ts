import { Limits } from '@/types/common';
import { MutableRefObject } from 'react';

export const getBoundedValue = (
  newValue: number,
  minLimit = 0,
  maxLimit = 0,
) => {
  return Math.min(Math.max(minLimit, newValue), maxLimit);
};

export const getObjectLimitsWithinParent = (
  parentRef: MutableRefObject<HTMLDivElement>,
  objectSize: number,
): Limits => {
  const parentOffset = parentRef.current.offsetLeft;
  const parentWidth = parentRef.current.clientWidth;
  const minLimit = parentOffset + objectSize / 2;
  const maxLimit = parentOffset + parentWidth - objectSize / 2;
  return {
    min: minLimit,
    max: maxLimit,
  };
};
// FOR INPUT VALUE
// const fromPercentageToValue = () => {
//   const leftPercentage = leftKnobProperties.percent;
//   const rightPercentage = rightKnobProperties.percent;
//   const range = maxPrice - minPrice;
//   let leftValue = Math.round((leftPercentage * range) / 100 + minPrice);
//   let rightValue = Math.round((rightPercentage * range) / 100 + minPrice);

//   const isSameValue = leftValue === rightValue;
//   const isZeroPercentage = leftPercentage === 0 && rightPercentage === 0;
//   const isLeftPercentageBigger = leftPercentage > rightPercentage;

//   if (isSameValue && isZeroPercentage) {
//     leftValue = minPrice;
//     rightValue = minPrice + 1;
//   }
//   if (isSameValue && isLeftPercentageBigger) {
//     rightValue += 1;
//   }
//   if (isSameValue && !isLeftPercentageBigger) {
//     leftValue -= 1;
//   }

//   leftValue = Math.max(minPrice, leftValue);
//   rightValue = Math.min(maxPrice, rightValue);

//   return { leftValue, rightValue };
// };
