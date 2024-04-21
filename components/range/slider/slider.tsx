import {
  KnobOnChageProperties,
  KnobOnChangeSetter,
  SliderProps,
} from '@/components/range/types/range';
import { Limits } from '@/types/common';
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';
import Knob from '@/components/range/knob/knob';
import {
  getObjectLimitsWithinParent,
  getPercentageFromPriceRange,
} from '@/utils/utils';

/**
 * Renders a slider component with two knobs for selecting a range of values.
 *
 * @param {SliderProps} props component props.
 * @param {boolean} isFixedRange - Whether the slider is in fixed range mode.
 * @param {number} currentLeftValue - The current value of the left knob.
 * @param {number} currentRightValue - The current value of the right knob.
 * @param {Function} onChange - A callback function that is called when the slider values change.
 * @param {number} percentageLeftInput - The percentage value of the left knob.
 * @param {number} percentageRightInput - The percentage value of the right knob.
 * @param {PriceList} prices - An array of prices.
 * @param {number} minValue - The minimum value of the slider range.
 * @param {number} maxValue - The maximum value of the slider range.
 * @returns {JSX.Element} The rendered slider component.
 */
const Slider = ({
  isFixedRange,
  minValue,
  maxValue,
  onChange,
  percentageLeftInput,
  percentageRightInput,
  prices,
  refRightValue,
  refLeftValue,
}: SliderProps): JSX.Element => {
  const sliderRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const knobSize = 15;

  const percentagesPerPrice = prices.map((price) => {
    return getPercentageFromPriceRange({
      currentPrice: price,
      minPrice: minValue,
      maxPrice: maxValue,
    });
  });

  const knobInitialProperties: KnobOnChageProperties = {
    left: 0,
    rigth: 0,
    percentage: 0,
  };

  const [limits, setLimits]: [Limits, Dispatch<Limits>] = useState({
    min: 0,
    max: 0,
  });

  // set limits on mount
  useEffect(() => {
    if (sliderRef.current) {
      setLimits(getObjectLimitsWithinParent(sliderRef, knobSize));
    }
  }, [sliderRef?.current?.offsetLeft]);

  const [leftKnobProperties, setLeftKnobProperties]: KnobOnChangeSetter =
    useState(knobInitialProperties);

  const [rightKnobProperties, setRightKnobProperties]: KnobOnChangeSetter =
    useState(knobInitialProperties);

  const handleOnLeftKnobChange = (properties: KnobOnChageProperties) => {
    setLeftKnobProperties(properties);
  };

  const handleOnRightKnobChange = (properties: KnobOnChageProperties) => {
    setRightKnobProperties(properties);
  };

  useEffect(() => {
    onChange({
      leftPercentage: leftKnobProperties.percentage,
      rightPercentage: rightKnobProperties.percentage,
    });
  }, [leftKnobProperties.percentage, rightKnobProperties.percentage]);

  return (
    <div className="element relative flex w-full flex-col items-center justify-center">
      <div
        data-testid="slider"
        ref={sliderRef}
        className="slider relative box-border flex h-4 w-full flex-col justify-center"
      >
        {sliderRef.current && (
          <div>
            <Knob
              currentValue={refLeftValue}
              fixedPercentages={percentagesPerPrice}
              isFixedRange={isFixedRange}
              isLeft={true}
              minLimit={limits.min}
              maxLimit={Math.max(rightKnobProperties.left - knobSize, knobSize)}
              minValue={minValue}
              maxValue={maxValue}
              onChange={handleOnLeftKnobChange}
              percentValue={percentageLeftInput}
            />
            <Knob
              currentValue={refRightValue}
              fixedPercentages={percentagesPerPrice}
              isFixedRange={isFixedRange}
              isLeft={false}
              percentValue={percentageRightInput}
              minLimit={leftKnobProperties.rigth}
              maxLimit={limits.max}
              minValue={minValue}
              maxValue={maxValue}
              onChange={handleOnRightKnobChange}
            />
            <div
              data-testid="progress-bar"
              role="progressbar"
              className="h-1 w-full rounded-full bg-slate-800"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
