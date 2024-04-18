'use client';

import { KnobOnChageProperties } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import Knob from './knob/knob';

const Range = (): JSX.Element => {
  const [limits, setLimits] = useState({
    min: 0,
    max: 0,
  });
  const prices = [50, 250];
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const knobSize = 15;
  const sliderRef = useRef(null);

  const updateLimits = () => {
    const parentOffset = sliderRef.current.offsetLeft;
    const parentWidth = sliderRef.current.clientWidth;
    const minLimit = parentOffset + knobSize / 2;
    const maxLimit = parentOffset + parentWidth - knobSize / 2;
    setLimits({
      min: minLimit,
      max: maxLimit,
    });
  };
  useEffect(() => {
    if (sliderRef.current) {
      updateLimits();
    }
  }, [sliderRef?.current?.offsetLeft]);

  const [leftKnobProperties, setLeftKnobProperties] = useState({
    left: 0,
    rigth: 0,
    percent: 0,
  });

  const [rightKnobProperties, setRightKnobProperties] = useState({
    left: 0,
    rigth: 0,
    percent: 0,
  });
  const handleOnLeftKnobChange = (properties: KnobOnChageProperties) => {
    setLeftKnobProperties(properties);
  };

  const handleOnRightKnobChange = (properties: KnobOnChageProperties) => {
    setRightKnobProperties(properties);
  };
  const handleLeftInputChange = () => {};

  const handleRightInputChange = () => {};

  const fromPercentageToValue = () => {
    const leftPercentage = leftKnobProperties.percent;
    const rightPercentage = rightKnobProperties.percent;
    const range = maxPrice - minPrice;
    let leftValue = Math.round((leftPercentage * range) / 100 + minPrice);
    let rightValue = Math.round((rightPercentage * range) / 100 + minPrice);

    const isSameValue = leftValue === rightValue;
    const isZeroPercentage = leftPercentage === 0 && rightPercentage === 0;
    const isLeftPercentageBigger = leftPercentage > rightPercentage;

    if (isSameValue && isZeroPercentage) {
      leftValue = minPrice;
      rightValue = minPrice + 1;
    }
    if (isSameValue && isLeftPercentageBigger) {
      rightValue += 1;
    }
    if (isSameValue && !isLeftPercentageBigger) {
      leftValue -= 1;
    }

    leftValue = Math.max(minPrice, leftValue);
    rightValue = Math.min(maxPrice, rightValue);

    return { leftValue, rightValue };
  };

  return (
    <div className="conatiner flex flex-row items-center justify-center gap-x-2 stroke-black">
      <input
        className="text-center"
        type="number"
        id="left-input"
        name="left-input"
        step={1}
        min={minPrice}
        max={maxPrice - 1}
        placeholder={String(minPrice)}
        value={fromPercentageToValue().leftValue}
        onChange={handleLeftInputChange}
      />
      <div className="element relative flex w-full flex-col items-center justify-center">
        <div
          ref={sliderRef}
          className="slider relative box-border flex h-4 w-full flex-col justify-center"
        >
          {sliderRef.current && (
            <div>
              <Knob
                minLimit={limits.min}
                maxLimit={Math.max(
                  rightKnobProperties.left - knobSize,
                  knobSize,
                )}
                onChange={handleOnLeftKnobChange}
                isLeft={true}
                percentValue={0}
              />
              <Knob
                minLimit={leftKnobProperties.rigth}
                maxLimit={limits.max}
                onChange={handleOnRightKnobChange}
                isLeft={false}
                percentValue={100}
              />
              <div className="slider h-1 w-full rounded-full bg-black" />
            </div>
          )}
        </div>
      </div>
      <input
        className="text-center"
        type="number"
        id="right-input"
        name="right-input"
        min={minPrice + 1}
        max={maxPrice}
        placeholder={String(maxPrice)}
        value={fromPercentageToValue().rightValue}
        onChange={handleRightInputChange}
      />
    </div>
  );
};

export default Range;
