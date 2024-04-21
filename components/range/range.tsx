'use client';

import { PriceLimit } from '@/types/common';
import { RangeProps } from '@/types/range';
import { useEffect, useRef, useState } from 'react';
import Slider from '@/components/range/slider/slider';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import {
  getBoundedValue,
  getPercentageFromPriceRange,
  getPriceInRangeFromPercentage,
} from '@/utils/utils';

const Range = ({ prices }: RangeProps): JSX.Element => {
  const priceLimit: PriceLimit = {
    minPrice: prices?.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices?.length > 0 ? Math.max(...prices) : 0,
  };
  const [leftInputValue, setLeftInputValue] = useState(
    String(priceLimit.minPrice),
  );
  const [rightInputValue, setRightInputValue] = useState(
    String(priceLimit.maxPrice),
  );
  const letInputRef = useRef(Number(leftInputValue));
  const rightInputRef = useRef(Number(rightInputValue));
  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeftInputValue(String(e.target.value));
  };
  const handleRightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRightInputValue(String(e.target.value));
  };

  const [boundedLeftInputPercentage, setBoundedLeftInputPercentage] =
    useState(0);
  const [boundedRightInputPercentage, setBoundedRightInputPercentage] =
    useState(100);

  const debouncedLeftInputValue = useDebouncedValue({
    value: leftInputValue,
    delay: 700,
  });
  const debouncedRightInputValue = useDebouncedValue({
    value: rightInputValue,
    delay: 700,
  });

  useEffect(() => {
    const boundedLeftValue = getBoundedValue({
      value: Number(debouncedLeftInputValue),
      minLimit: priceLimit.minPrice,
      maxLimit: Number(rightInputValue),
    });
    const leftPercentage = getPercentageFromPriceRange({
      currentPrice: boundedLeftValue,
      minPrice: priceLimit.minPrice,
      maxPrice: priceLimit.maxPrice,
    });

    setLeftInputValue(String(boundedLeftValue));
    setBoundedLeftInputPercentage(leftPercentage);
  }, [debouncedLeftInputValue]);

  useEffect(() => {
    const boundedRightValue = getBoundedValue({
      value: Number(debouncedRightInputValue),
      minLimit: Number(leftInputValue),
      maxLimit: priceLimit.maxPrice,
    });
    const rightPercentage = getPercentageFromPriceRange({
      currentPrice: boundedRightValue,
      minPrice: priceLimit.minPrice,
      maxPrice: priceLimit.maxPrice,
    });

    setRightInputValue(String(boundedRightValue));
    setBoundedRightInputPercentage(rightPercentage);
  }, [debouncedRightInputValue]);

  const handleSliderChange = ({ leftPercentage, rightPercentage }) => {
    const leftValue = getPriceInRangeFromPercentage({
      currentPercentage: leftPercentage,
      minPrice: priceLimit.minPrice,
      maxPrice: priceLimit.maxPrice,
    });
    const rightValue = getPriceInRangeFromPercentage({
      currentPercentage: rightPercentage,
      maxPrice: priceLimit.maxPrice,
      minPrice: priceLimit.minPrice,
    });

    setLeftInputValue(String(leftValue));
    setRightInputValue(String(rightValue));
  };

  return (
    <div className="conatiner flex flex-row items-center justify-center gap-x-2 stroke-black">
      <input
        className="w-12 text-center"
        type="number"
        id="left-input"
        name="left-input"
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        placeholder={String(leftInputValue)}
        value={leftInputValue}
        onChange={handleLeftInputChange}
      />
      <Slider
        onChange={handleSliderChange}
        percentageLeftInput={boundedLeftInputPercentage}
        percentageRightInput={boundedRightInputPercentage}
        maxValue={priceLimit.maxPrice}
        minValue={priceLimit.minPrice}
        currentLeftValue={letInputRef?.current}
        currentRightValue={rightInputRef?.current}
      />
      <input
        className="text-center"
        type="number"
        id="right-input"
        name="right-input"
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        placeholder={String(priceLimit.maxPrice)}
        value={rightInputValue}
        onChange={handleRightInputChange}
      />
    </div>
  );
};

export default Range;
