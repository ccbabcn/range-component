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

export type Limits = {
  min: number;
  max: number;
};

type Price<T extends K> = {
  [K in keyof T as `${typeof K}Price`]: number;
};

export type PriceLimit = Price<Limits>;

export type PriceList = number[];
export type PriceListPromise = Promise<PriceList>;

export type LeftAndRight<T> = {
  leftValue: T;
  rightValue: T;
};

export type LeftAndRightValues = LeftAndRight<number>;
