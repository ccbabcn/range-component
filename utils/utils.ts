import {
  Limits,
  PriceFromPercentageConfig,
  PercentageFromPriceConfig,
  GetBoundedValueConfig,
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
export const getPercentageFromPrice = ({
  price,
  minPrice,
  maxPrice,
}: PercentageFromPriceConfig) => {
  const priceRange = maxPrice - minPrice;
  return Math.round(((price - minPrice) * 100) / priceRange);
};

export const getPriceFromPercentage = ({
  percentage,
  maxPrice,
  minPrice,
}: PriceFromPercentageConfig) => {
  return Math.round((percentage / 100) * (maxPrice - minPrice) + minPrice);
};
