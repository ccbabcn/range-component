import { useMoveProps } from '@/components/range/types/range';
import { findClosestValueinValueRange, getBoundedValue } from '@/utils/utils';
import { useEffect } from 'react';

const useTouchMove = ({
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
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && objectRef.current) {
        const newPositionX = e.touches[0].clientX - parentLeft;
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

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', stopDragging);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, maxLimit, minLimit]);
};

export default useTouchMove;
