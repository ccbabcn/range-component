import {
  Limits,
  PriceFromPercentageConfig,
  PercentageFromPriceConfig,
  GetBoundedValueConfig,
  PositionFromPercentageConfig,
  PercentageFromPositionConfig,
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
  currentPrice,
  minPrice,
  maxPrice,
}: PercentageFromPriceConfig) => {
  const priceRange = maxPrice - minPrice;
  return Math.round(((currentPrice - minPrice) * 100) / priceRange);
};

export const getPriceFromPercentage = ({
  currentPercentage,
  maxPrice,
  minPrice,
}: PriceFromPercentageConfig) => {
  return Math.round(
    (currentPercentage / 100) * (maxPrice - minPrice) + minPrice,
  );
};

export const getPositionFromPercentage = ({
  currentPercentage,
  minPosition,
  maxPosition,
}: PositionFromPercentageConfig) => {
  return Math.round(
    (currentPercentage / 100) * (maxPosition - minPosition) + minPosition,
  );
};

export const getPercentageFromPosition = ({
  currentPosition,
  minPosition,
  maxPosition,
}: PercentageFromPositionConfig) => {
  const positionRange = maxPosition - minPosition;
  return Math.round(((currentPosition - minPosition) * 100) / positionRange);
};
