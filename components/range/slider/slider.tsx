import { KnobOnChageProperties, KnobOnChangeSetter } from '@/types/range';
import { Limits } from '@/types/common';
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from 'react';
import Knob from '@/components/range/knob/knob';
import { getObjectLimitsWithinParent } from '@/utils/utils';

const Slider = (): JSX.Element => {
  const sliderRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const knobSize = 15;

  const knobInitialProperties: KnobOnChageProperties = {
    left: 0,
    rigth: 0,
    percent: 0,
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

  return (
    <div className="element relative flex w-full flex-col items-center justify-center">
      <div
        ref={sliderRef}
        className="slider relative box-border flex h-4 w-full flex-col justify-center"
      >
        {sliderRef.current && (
          <div>
            <Knob
              minLimit={limits.min}
              maxLimit={Math.max(rightKnobProperties.left - knobSize, knobSize)}
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
  );
};

export default Slider;
