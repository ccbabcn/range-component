import { useMoveProps } from '@/app/types';
import { getBoundedValue } from '@/app/utils';
import { useEffect } from 'react';

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
