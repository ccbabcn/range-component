import { KnobProps } from '@/types';
import React, { useRef, useState, useEffect } from 'react';
import useMouseMove from './useMouseMove';
import useTouchMove from './useTouchMove';

/**
 * Renders a draggable knob component for a range input.
 *
 * @param {Object} props - The component props.
 * @param {number} props.maxLimit - The maximum value of the range input.
 * @param {number} props.minLimit - The minimum value of the range input.
 * @param {number} props.percentValue - The value of the knob in percentage.
 * @param {boolean} props.isLeft - Indicates if the knob is on the left side of the range input.
 * @param {function} props.onChange - The callback function called when the knob position changes.
 * @return {JSX.Element} The rendered knob component.
 */
const Knob = ({
  maxLimit,
  minLimit,
  percentValue,
  isLeft,
  onChange,
}: KnobProps): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const [percent, setPercent] = useState(0);
  const [knobLeft, setKnobLeft] = useState(0);
  const knobRef = useRef<HTMLDivElement>(null);
  const knobParent = knobRef.current?.parentElement;
  const parentLeft = knobParent?.getBoundingClientRect().left;
  const parentWidth = knobParent?.clientWidth;
  const knobSize = 15;
  const knobHalfSize = knobSize / 2;
  const parentMaxLimit = parentWidth - knobHalfSize;

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
  //custom hooks to handle mouse and touch and update position
  useMouseMove({
    isDragging,
    objectRef: knobRef,
    parentLeft,
    minLimit,
    maxLimit,
    updateKnobPosition,
    stopDragging,
  });
  useTouchMove({
    isDragging,
    objectRef: knobRef,
    parentLeft,
    minLimit,
    maxLimit,
    updateKnobPosition,
    stopDragging,
  });
  // Handle initial position
  useEffect(() => {
    if (parentWidth) {
      if (percentValue === 0) {
        const initialPos = isLeft ? knobHalfSize : knobSize;
        updateKnobPosition(initialPos);
      }
      if (percentValue > 0) {
        const initialOffset = isLeft ? knobSize : knobHalfSize;
        const knobNewPos = (percentValue * (parentWidth - initialOffset)) / 100;

        updateKnobPosition(knobNewPos);
      }
    }
  }, [parentWidth, percentValue]);
  // Set percent from movement after bouncing
  useEffect(() => {
    const isLimit = knobLeft - knobHalfSize <= 0;
    const percent =
      (isLimit
        ? 0
        : (knobLeft - knobHalfSize + (isLeft ? knobSize : 0)) /
          (parentMaxLimit - knobHalfSize)) * 100;
    setPercent(Math.round(percent));
  }, [knobLeft]);

  // Pass knob properties to parent on percent change
  useEffect(() => {
    const knobProperties = {
      left: knobLeft,
      rigth: knobLeft + knobSize,
      percent,
    };
    onChange(knobProperties);
  }, [percent, knobLeft]);

  return (
    <div
      ref={knobRef}
      aria-label="range knob"
      aria-valuemin={0}
      aria-valuemax={600}
      aria-valuenow={0}
      role="slider"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="knob"
      data-testid="knob"
      style={{
        position: 'absolute',
        left: knobSize / 2,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: knobSize,
        width: knobSize,
        backgroundColor: 'black',
        borderRadius: '50%',
      }}
    >
      <div className="knob:active h-full w-full cursor-grab rounded-full bg-black hover:animate-expand focus:animate-expand active:cursor-grabbing" />
    </div>
  );
};

Knob.displayName = 'Knob';

export default Knob;
