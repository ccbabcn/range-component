import { PriceLimit } from './common';

export type KnobOnChageProperties = {
  left: number;
  rigth: number;
  percent: number;
};

export type SliderProps = {
  priceLimit: PriceLimit;
};

export type RangeProps = {
  prices: PriceList;
};
export type KnobProps = {
  maxLimit: number;
  minLimit: number;
  percentValue: number;
  isLeft: boolean;
  onChange: (properties: KnobOnChageProperties) => void;
};

export type useMoveProps = {
  isDragging: boolean;
  objectRef: React.RefObject<HTMLDivElement>;
  parentLeft: number;
  minLimit: number;
  maxLimit: number;
  updateKnobPosition: (newPosition: number) => void;
  stopDragging: () => void;
};

export type KnobOnChangeSetter = [
  KnobOnChageProperties,
  Dispatch<KnobOnChageProperties>,
];

export type ValueToPercentageConfig = {
  leftPercentage: number;
  rightPercentage: number;
  minPrice: number;
  maxPrice: number;
};
