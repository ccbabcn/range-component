'use client';

import { PriceLimit } from '@/types/common';
import { RangeProps } from '@/types/range';
import { useRef, useState } from 'react';
import Slider from '@/components/range/slider/slider';
import Input from '@/components/range/input/input';
import { getPriceInRangeFromPercentage } from '@/utils/utils';

/**
 * Renders a range component with two inputs and a slider.
 *
 * @param {object} prices - An array of prices.
 * @return {JSX.Element} The rendered range component.
 */
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

  const [boundedLeftInputPercentage, setBoundedLeftInputPercentage] =
    useState(0);
  const [boundedRightInputPercentage, setBoundedRightInputPercentage] =
    useState(100);

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

  const handleLeftInputChange = ({ refValue, inputPercentage }) => {
    letInputRef.current = refValue;
    setBoundedLeftInputPercentage(inputPercentage);
  };

  const handleRightInputChange = ({ refValue, inputPercentage }) => {
    rightInputRef.current = refValue;
    setBoundedRightInputPercentage(inputPercentage);
  };

  return (
    <div className="conatiner flex flex-row items-center justify-center gap-x-2 stroke-black">
      <Input
        value={Number(leftInputValue)}
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        minValue={priceLimit.minPrice}
        maxValue={Number(rightInputValue)}
        onUpdate={handleLeftInputChange}
      />
      <Slider
        onChange={handleSliderChange}
        percentageLeftInput={boundedLeftInputPercentage}
        percentageRightInput={boundedRightInputPercentage}
        maxValue={priceLimit.maxPrice}
        minValue={priceLimit.minPrice}
        refLeftValue={letInputRef?.current}
        refRightValue={rightInputRef?.current}
      />
      <Input
        value={Number(rightInputValue)}
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        minValue={Number(leftInputValue)}
        maxValue={priceLimit.maxPrice}
        onUpdate={handleRightInputChange}
      />
    </div>
  );
};

export default Range;
