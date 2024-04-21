export type KnobOnChageProperties = {
  left: number;
  rigth: number;
  percentage: number;
};

export type SliderProps = {
  onChange: (params: LeftAndRightPercentage) => void;
  percentageLeftInput: number;
  percentageRightInput: number;
  minValue: number;
  maxValue: number;
  refLeftValue: number;
  refRightValue: number;
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

export type InputOnUpdateProps = {
  refValue: number;
  inputPercentage: number;
};

export type InputProps = {
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
