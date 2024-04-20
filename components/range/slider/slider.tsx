import {
  KnobOnChageProperties,
  KnobOnChangeSetter,
  SliderProps,
} from '@/types/range';
import { Limits } from '@/types/common';
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';
import Knob from '@/components/range/knob/knob';
import { getObjectLimitsWithinParent } from '@/utils/utils';

/**
 * Renders a slider component with two knobs for selecting a range of values.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentLeftValue - The current value of the left knob.
 * @param {number} props.currentRightValue - The current value of the right knob.
 * @param {Function} props.onChange - A callback function that is called when the slider values change.
 * @param {number} props.percentageLeftInput - The percentage value of the left knob.
 * @param {number} props.percentageRightInput - The percentage value of the right knob.
 * @param {number} props.minValue - The minimum value of the slider range.
 * @param {number} props.maxValue - The maximum value of the slider range.
 * @returns {JSX.Element} The rendered slider component.
 */
const Slider = ({
  currentLeftValue,
  currentRightValue,
  onChange,
  percentageLeftInput,
  percentageRightInput,
  minValue,
  maxValue,
}: SliderProps): JSX.Element => {
  const sliderRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const knobSize = 15;

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
        ref={sliderRef}
        className="slider relative box-border flex h-4 w-full flex-col justify-center"
      >
        {sliderRef.current && (
          <div>
            <Knob
              currentValue={currentLeftValue}
              isLeft={true}
              percentValue={percentageLeftInput}
              minLimit={limits.min}
              maxLimit={Math.max(rightKnobProperties.left - knobSize, knobSize)}
              minValue={minValue}
              maxValue={maxValue}
              onChange={handleOnLeftKnobChange}
            />
            <Knob
              currentValue={currentRightValue}
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
              className="slider h-1 w-full rounded-full bg-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
