import {
  Limits,
  PriceFromPercentageConfig,
  PercentageFromPriceConfig,
  GetBoundedValueConfig,
  PositionFromPercentageConfig,
  PercentageFromPositionConfig,
  ValueFromRangeConfig,
  FindClosestValueInRangeConfig,
} from '@/types/common';
import { MutableRefObject } from 'react';

export const getBoundedValue = ({
  value,
  minLimit,
  maxLimit,
}: GetBoundedValueConfig) => {
  return Math.min(Math.max(minLimit, value), maxLimit);
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

export const getValueInRangeFromPercentage = ({
  current,
  min,
  max,
}: ValueFromRangeConfig) => {
  return Math.round((current / 100) * (max - min) + min);
};
export const getPriceInRangeFromPercentage = ({
  currentPercentage,
  maxPrice,
  minPrice,
}: PriceFromPercentageConfig) =>
  getValueInRangeFromPercentage({
    current: currentPercentage,
    min: minPrice,
    max: maxPrice,
  });
export const getPositionInRangeFromPercentage = ({
  currentPercentage,
  minPosition,
  maxPosition,
}: PositionFromPercentageConfig) =>
  getValueInRangeFromPercentage({
    current: currentPercentage,
    min: minPosition,
    max: maxPosition,
  });
export const getPercentageFromValueRange = ({
  current,
  min,
  max,
}: ValueFromRangeConfig) => {
  const range = max - min;
  return Math.round(((current - min) * 100) / range);
};
export const getPercentageFromPriceRange = ({
  currentPrice,
  minPrice,
  maxPrice,
}: PercentageFromPriceConfig) =>
  getPercentageFromValueRange({
    current: currentPrice,
    min: minPrice,
    max: maxPrice,
  });
export const getPercentageFromPositionRange = ({
  currentPosition,
  minPosition,
  maxPosition,
}: PercentageFromPositionConfig) =>
  getPercentageFromValueRange({
    current: currentPosition,
    min: minPosition,
    max: maxPosition,
  });

export const findClosestValueinValueRange = ({
  values,
  prev,
  next,
  currentValue,
}: FindClosestValueInRangeConfig): number => {
  if (prev == next) {
    return values[prev];
  }
  const mid = Math.floor((prev + next) / 2);
  const prevClosest = findClosestValueinValueRange({
    values,
    prev,
    next: mid,
    currentValue,
  });
  const nextClosest = findClosestValueinValueRange({
    values,
    prev: mid + 1,
    next,
    currentValue,
  });

  if (nextClosest === undefined) {
    return values[prev];
  }

  if (prevClosest === undefined) {
    return values[next];
  }
  if (
    Math.abs(prevClosest - currentValue) <= Math.abs(nextClosest - currentValue)
  ) {
    return prevClosest;
  } else {
    return nextClosest;
  }
};
