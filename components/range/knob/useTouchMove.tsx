import { useMoveProps } from '@/types/range';
import { getBoundedValue } from '@/utils/utils';
import { useEffect } from 'react';

const useTouchMove = ({
  isDragging,
  objectRef,
  parentLeft,
  minLimit,
  maxLimit,
  updateKnobPosition,
  stopDragging,
}: useMoveProps) => {
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && objectRef.current) {
        const newPositionX = e.touches[0].clientX - parentLeft;
        const boundedPositionX = getBoundedValue(
          newPositionX,
          minLimit,
          maxLimit,
        );
        updateKnobPosition(boundedPositionX);
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
