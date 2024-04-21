'use client';

import { useRef, useState } from 'react';
import Input from '@/components/range/input/input';
import Slider from '@/components/range/slider/slider';
import { getPriceInRangeFromPercentage, guardIsNan } from '@/utils/utils';
import {
  RangeProps,
  onInputUpdateConfig,
} from '@/components/range/types/range';
import { LeftAndRightPercentage, PriceLimit } from '@/types/common';

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
  const isFixedRange = prices.length > 2;

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

  const handleSliderChange = ({
    leftPercentage,
    rightPercentage,
  }: LeftAndRightPercentage) => {
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

  const handleLeftInputChange = ({
    refValue,
    inputPercentage,
  }: onInputUpdateConfig) => {
    letInputRef.current = refValue;
    setBoundedLeftInputPercentage(inputPercentage);
  };

  const handleRightInputChange = ({
    refValue,
    inputPercentage,
  }: onInputUpdateConfig) => {
    rightInputRef.current = refValue;
    setBoundedRightInputPercentage(inputPercentage);
  };

  //Guarded and rounded values
  const leftInputSecureValue = guardIsNan({
    value: leftInputValue,
    defaultValue: priceLimit.minPrice,
    shouldRound: !isFixedRange,
  });
  const rightInputSecureValue = guardIsNan({
    value: rightInputValue,
    defaultValue: priceLimit.maxPrice,
    shouldRound: !isFixedRange,
  });
  const leftMaxSecureValue = guardIsNan({
    value: rightInputValue,
    defaultValue: priceLimit.maxPrice,
    shouldRound: !isFixedRange,
  });
  const rightMinSecureValue = guardIsNan({
    value: leftInputValue,
    defaultValue: priceLimit.minPrice,
    shouldRound: !isFixedRange,
  });

  return (
    <div className="conatiner flex flex-row items-center justify-center gap-x-2">
      <Input
        isDisabled={isFixedRange}
        isLeft={true}
        value={leftInputSecureValue}
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        minValue={priceLimit.minPrice}
        maxValue={leftMaxSecureValue}
        onUpdate={handleLeftInputChange}
      />
      <Slider
        isFixedRange={isFixedRange}
        onChange={handleSliderChange}
        minValue={priceLimit.minPrice}
        maxValue={priceLimit.maxPrice}
        percentageLeftInput={boundedLeftInputPercentage}
        percentageRightInput={boundedRightInputPercentage}
        refLeftValue={letInputRef?.current}
        refRightValue={rightInputRef?.current}
        prices={prices}
      />
      <Input
        isDisabled={isFixedRange}
        isLeft={false}
        value={rightInputSecureValue}
        min={priceLimit.minPrice}
        max={priceLimit.maxPrice}
        minValue={rightMinSecureValue}
        maxValue={priceLimit.maxPrice}
        onUpdate={handleRightInputChange}
      />
    </div>
  );
};

Range.displayName = 'Range';

export default Range;
