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
