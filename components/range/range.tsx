'use client';

import { PriceLimit } from '@/types/common';
import Slider from '@/components/range/slider/slider';

const Range = (): JSX.Element => {
  const prices = [50, 250];
  const priceLimit: PriceLimit = {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };

  const handleLeftInputChange = () => {};

  const handleRightInputChange = () => {};

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
        placeholder={String(priceLimit.minPrice)}
        value={priceLimit.minPrice}
        onChange={handleLeftInputChange}
      />
      <Slider />
      <input
        className="text-center"
        type="number"
        id="right-input"
        name="right-input"
        min={priceLimit.minPrice + 1}
        max={priceLimit.maxPrice}
        placeholder={String(priceLimit.maxPrice)}
        value={priceLimit.maxPrice}
        onChange={handleRightInputChange}
      />
    </div>
  );
};

export default Range;
