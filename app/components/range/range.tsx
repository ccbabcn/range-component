'use client';

import { useEffect, useRef, useState } from 'react';
import Knob from './knob/knob';
import { KnobOnChageProperties } from '@/app/types';

const Range = (): JSX.Element => {
  const [limits, setLimits] = useState({
    minSliderValue: 0,
    maxSliderValue: 0,
    offset: 0,
  });
  const knobSize = 15;
  const sliderRef = useRef(null);
  useEffect(() => {
    if (sliderRef.current) {
      const parentOffset = sliderRef.current.offsetLeft;
      const parentWidth = sliderRef.current.clientWidth;
      const minLimit = parentOffset + knobSize / 2;
      const maxLimit = parentOffset + parentWidth - knobSize / 2;
      setLimits({
        minSliderValue: minLimit,
        maxSliderValue: maxLimit,
        offset: parentOffset,
      });
    }
  }, []);

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

  return (
    <div className="conatiner relative h-3 w-full items-center justify-center stroke-black">
      <div className="relative flex w-full flex-row items-center">
        <div
          ref={sliderRef}
          className="slider relative box-border flex h-4 w-full flex-col justify-center"
        >
          {sliderRef.current && (
            <>
              <Knob
                minLimit={limits.minSliderValue}
                maxLimit={Math.max(
                  rightKnobProperties.left - knobSize,
                  knobSize,
                )}
                onChange={handleOnLeftKnobChange}
                isLeft={true}
                initialValue={0}
              />
              <Knob
                minLimit={leftKnobProperties.rigth}
                maxLimit={limits.maxSliderValue}
                onChange={handleOnRightKnobChange}
                isLeft={false}
                initialValue={100}
              />
              <div className="slider h-1 w-full rounded-full bg-black" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Range;
