import { useMoveProps } from '@/types/range';
import { useEffect } from 'react';
import { getBoundedValue } from '@/utils/utils';

const useMouseMove = ({
  isDragging,
  objectRef,
  parentLeft,
  minLimit,
  maxLimit,
  updateKnobPosition,
  stopDragging,
}: useMoveProps) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && objectRef.current) {
        const newPositionX = e.clientX - parentLeft;
        const boundedPositionX = getBoundedValue(
          newPositionX,
          minLimit,
          maxLimit,
        );
        updateKnobPosition(boundedPositionX);
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
