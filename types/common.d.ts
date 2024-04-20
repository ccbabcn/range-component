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

export type PercentageFromPriceConfig = {
  price: number;
  minPrice: number;
  maxPrice: number;
};
export type PriceFromPercentageConfig = {
  percentage: number;
  maxPrice: number;
  minPrice: number;
};
export type GetBoundedValueConfig = {
  value: number;
  minLimit: number;
  maxLimit: number;
};
