'use client';

import { PriceLimit } from '@/types/common';
import Slider from '@/components/range/slider/slider';
import { RangeProps } from '@/types/range';
import { getValueFromPercentage } from '@/utils/utils';
import { useState } from 'react';

const Range = ({ prices }: RangeProps): JSX.Element => {
  const priceLimit: PriceLimit = {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
  const [leftInputValue, setLeftInputValue] = useState(priceLimit.minPrice);
  const [rightInputValue, setRightInputValue] = useState(priceLimit.maxPrice);

  const handleLeftInputChange = () => {};

  const handleRightInputChange = () => {};

  const handleSliderChange = ({ leftPercentage, rightPercentage }) => {
    const { leftValue, rightValue } = getValueFromPercentage({
      leftPercentage,
      rightPercentage,
      minPrice: priceLimit.minPrice,
      maxPrice: priceLimit.maxPrice,
    });
    setLeftInputValue(leftValue);
    setRightInputValue(rightValue);
  };

  return (
    <div className="conatiner flex flex-row items-center justify-center gap-x-2 stroke-black">
      <input
        className="text-center"
        type="number"
        id="left-input"
        name="left-input"
        step={1}
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice - 1}
        placeholder={String(leftInputValue)}
        value={leftInputValue}
        onChange={handleLeftInputChange}
      />
      <Slider onChange={handleSliderChange} />
      <input
        className="text-center"
        type="number"
        id="right-input"
        name="right-input"
        min={priceLimit.minPrice + 1}
        max={priceLimit.maxPrice}
        placeholder={String(priceLimit.maxPrice)}
        value={rightInputValue}
        onChange={handleRightInputChange}
      />
    </div>
  );
};

export default Range;
