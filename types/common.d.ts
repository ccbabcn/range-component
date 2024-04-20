export type BoundingClientRect = {
  left: number;
  right: number;
  width: number;
  height: number;
  top: number;
  bottom: number;
  x: number;
  y: number;
};
export type Mapper<T, N extends string> = {
  [P in keyof T as `${P}${N}`]: T[P];
};

export type Limits = {
  min: number;
  max: number;
};
export type LeftAndRight<T> = {
  left: T;
  right: T;
};

export type PriceLimit = Mapper<Limits, 'Price'>;
export type PriceList = number[];
export type PriceListPromise = Promise<PriceList>;

export type LeftAndRightPercentage = Mapper<LeftAndRight<number>, 'Percentage'>;
export type LeftAndRightValues = Mapper<LeftAndRight<number>, 'Value'>;

export type PriceFromPercentageConfig = {
  currentPercentage: number;
  maxPrice: number;
  minPrice: number;
};
export type PositionFromPercentageConfig = {
  currentPercentage: number;
  minPosition: number;
  maxPosition: number;
};
export type ValueFromRangeConfig = {
  current: number;
  min: number;
  max: number;
};
export type PercentageFromPriceConfig = Mapper<ValueFromRangeConfig, 'Price'>;
export type PercentageFromPositionConfig = Mapper<
  ValueFromRangeConfig,
  'Position'
>;

export type GetBoundedValueConfig = {
  value: number;
  minLimit: number;
  maxLimit: number;
};
