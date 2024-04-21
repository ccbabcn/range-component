import { KnobPositionFromPercentageConfig } from '@/components/range/types/range';
import { getPositionInRangeFromPercentage } from '@/utils/utils';

const getKnobPositionFromPercentage = ({
  isLeft,
  knobSize,
  knobHalfSize,
  parentWidth,
  percentValue,
}: KnobPositionFromPercentageConfig) => {
  let knobPosition;
  if (isLeft) {
    knobPosition = getPositionInRangeFromPercentage({
      currentPercentage: percentValue,
      minPosition: knobHalfSize,
      maxPosition: parentWidth - knobSize,
    });
  }
  if (!isLeft) {
    knobPosition = getPositionInRangeFromPercentage({
      currentPercentage: percentValue,
      minPosition: knobSize + knobHalfSize,
      maxPosition: parentWidth - knobHalfSize,
    });
  }
  return knobPosition;
};

export default getKnobPositionFromPercentage;
