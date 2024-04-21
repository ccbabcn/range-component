import { KnobProps } from '@/components/range/types/range';
import React, { useRef, useState, useEffect } from 'react';
import useMouseMove from './useMouseMove';
import useTouchMove from './useTouchMove';
import { getBoundedValue, getPercentageFromPositionRange } from '@/utils/utils';
import getKnobPositionFromPercentage from './getKnobPositionFromPercentage';

/**
 * Renders a draggable knob component for a range input.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentValue - The current value of the range input for this knob.
 * @param {boolean} props.isLeft - Indicates if the knob is on the left side of the range input for this knob.
 * @param {number} props.minLimit - The minimum position of the knob.
 * @param {number} props.maxLimit - The maximum position of the knob.
 * @param {number} props.minValue - The min value of the range input for this knob.
 * @param {number} props.maxValue - The maximum value of the range input for this knob.
 * @param {number} props.percentValue - The value of the knob in percentage.
 * @param {function} props.onChange - The callback function called when the knob position changes.
 *
 * @return {JSX.Element} The rendered knob component.
 */
const Knob = ({
  currentValue,
  fixedPercentages,
  isFixedRange,
  isLeft,
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  onChange,
  percentValue,
}: KnobProps): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [percentage, setPercent] = useState(0);
  const [knobLeft, setKnobLeft] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);
  const knobParent = knobRef.current?.parentElement;
  const parentLeft = knobParent?.getBoundingClientRect().left;
  const parentWidth = knobParent?.clientWidth;
  const knobSize = 15;
  const knobHalfSize = knobSize / 2;
  const [fixedPositions, setFixedPositions] = useState<number[]>([]);

  useEffect(() => {
    if (parentWidth) {
      const fixedPositions = fixedPercentages.map((percentage) => {
        return getKnobPositionFromPercentage({
          isLeft,
          knobSize,
          knobHalfSize,
          parentWidth,
          percentValue: percentage,
        });
      });
      setFixedPositions(fixedPositions);
    }
  }, [parentWidth]);

  const updateKnobPosition = (newPosition) => {
    knobRef.current.style.left = `${newPosition}px`;
    setKnobLeft(newPosition);
  };
  const stopDragging = () => {
    setIsDragging(false);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleTouchStart = () => {
    setIsDragging(true);
  };
  //custom hooks to handle mouse events
  useMouseMove({
    isDragging,
    isFixedRange,
    fixedPositions,
    minLimit,
    maxLimit,
    objectRef: knobRef,
    parentLeft,
    stopDragging,
    updateKnobPosition,
  });
  //custom hooks to handle touch events
  useTouchMove({
    isDragging,
    isFixedRange,
    fixedPositions,
    minLimit,
    maxLimit,
    objectRef: knobRef,
    parentLeft,
    stopDragging,
    updateKnobPosition,
  });
  useEffect(() => {
    // Handle knob position from percent change
    if (parentWidth) {
      const knobNewPosition = getKnobPositionFromPercentage({
        isLeft,
        knobSize,
        knobHalfSize,
        parentWidth,
        percentValue,
      });
      updateKnobPosition(knobNewPosition);
    }
  }, [parentWidth, percentValue]);
  useEffect(() => {
    // Set percent from movement after bouncing
    let percent;
    let boundedKnobPosition;

    if (isLeft) {
      boundedKnobPosition = getBoundedValue({
        value: knobLeft,
        minLimit: knobHalfSize,
        maxLimit: parentWidth - knobSize,
      });
      percent = getPercentageFromPositionRange({
        currentPosition: boundedKnobPosition,
        minPosition: knobHalfSize,
        maxPosition: parentWidth - knobSize,
      });
    }

    if (!isLeft) {
      boundedKnobPosition = getBoundedValue({
        value: knobLeft,
        minLimit: knobSize,
        maxLimit: parentWidth - knobHalfSize,
      });
      percent = getPercentageFromPositionRange({
        currentPosition: knobLeft,
        minPosition: knobSize + knobHalfSize,
        maxPosition: parentWidth - knobHalfSize,
      });
    }

    setPercent(percent);
  }, [knobLeft]);

  useEffect(() => {
    // Pass knob properties to parent on percent change
    const knobProperties = {
      left: knobLeft,
      rigth: knobLeft + knobSize,
      percentage,
    };
    onChange(knobProperties);
  }, [percentage, knobLeft]);

  return (
    <div
      ref={knobRef}
      aria-label="range"
      aria-valuenow={currentValue}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      role="slider"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="knob"
      data-testid={isLeft ? 'left-knob' : 'right-knob'}
      style={{
        position: 'absolute',
        left: knobSize / 2,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: knobSize,
        width: knobSize,
        backgroundColor: 'transparent',
        borderRadius: '50%',
      }}
    >
      <div className="knob:active h-full w-full cursor-grab rounded-full bg-slate-800 hover:animate-expand focus:animate-expand active:cursor-grabbing" />
    </div>
  );
};

Knob.displayName = 'Knob';

export default Knob;
