import { PriceList } from '@/types/common';

export type KnobOnChageProperties = {
  left: number;
  rigth: number;
  percentage: number;
};

export type SliderProps = {
  onChange: (params: LeftAndRightPercentage) => void;
  isFixedRange: boolean;
  minValue: number;
  maxValue: number;
  percentageLeftInput: number;
  percentageRightInput: number;
  prices: PriceList;
  refLeftValue: number;
  refRightValue: number;
};

export type RangeProps = {
  prices: PriceList;
};
export type KnobProps = {
  currentValue: number;
  fixedPercentages: number[];
  isFixedRange: boolean;
  isLeft: boolean;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onChange: (params: KnobOnChageProperties) => void;
  percentValue: number;
};

export type useMoveProps = {
  isDragging: boolean;
  isFixedRange: boolean;
  fixedPositions: number[];
  minLimit: number;
  maxLimit: number;
  objectRef: React.RefObject<HTMLDivElement>;
  parentLeft: number;
  stopDragging: () => void;
  updateKnobPosition: (newPosition: number) => void;
};

export type InputOnUpdateProps = {
  refValue: number;
  inputPercentage: number;
};

export type InputProps = {
  isDisabled: boolean;
  isLeft: boolean;
  value: number;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onUpdate: (params: InputOnUpdateProps) => void;
};

export type KnobOnChangeSetter = [
  KnobOnChageProperties,
  Dispatch<KnobOnChageProperties>,
];

export type KnobPositionFromPercentageConfig = {
  isLeft: boolean;
  knobSize: number;
  knobHalfSize: number;
  parentWidth: number;
  percentValue: number;
};

export type onInputUpdateConfig = {
  refValue: number;
  inputPercentage: number;
};
