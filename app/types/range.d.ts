export type KnobOnChageProperties = {
  left: number;
  rigth: number;
  percent: number;
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
