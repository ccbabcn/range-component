export type KnobOnChageProperties = {
  left: number;
  rigth: number;
  percentage: number;
};

export type SliderProps = {
  currentLeftValue: number;
  currentRightValue: number;
  onChange: (params: LeftAndRightPercentage) => void;
  percentageLeftInput: number;
  percentageRightInput: number;
  minValue: number;
  maxValue: number;
};

export type RangeProps = {
  prices: PriceList;
};
export type KnobProps = {
  currentValue: number;
  isLeft: boolean;
  percentValue: number;
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  onChange: (params: KnobOnChageProperties) => void;
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
