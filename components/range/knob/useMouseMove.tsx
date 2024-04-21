import { useEffect } from 'react';
import { useMoveProps } from '@/components/range/types/range';
import { findClosestValueinValueRange, getBoundedValue } from '@/utils/utils';

const useMouseMove = ({
  isDragging,
  isFixedRange,
  fixedPositions,
  minLimit,
  maxLimit,
  objectRef,
  parentLeft,
  stopDragging,
  updateKnobPosition,
}: useMoveProps) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && objectRef.current) {
        const newPositionX = e.clientX - parentLeft;
        const boundedPositionX = getBoundedValue({
          value: newPositionX,
          minLimit,
          maxLimit,
        });
        if (isFixedRange) {
          const closestPosition = findClosestValueinValueRange({
            values: fixedPositions,
            prev: 0,
            next: fixedPositions.length - 1,
            currentValue: boundedPositionX,
          });
          updateKnobPosition(closestPosition);
        }
        if (!isFixedRange) {
          updateKnobPosition(boundedPositionX);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragging);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [isDragging, maxLimit, minLimit]);
};

export default useMouseMove;
