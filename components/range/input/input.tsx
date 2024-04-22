import { useEffect, useRef, useState } from 'react';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { getBoundedValue, getPercentageFromPriceRange } from '@/utils/utils';
import { InputProps } from '@/components/range/types/range';

/**
 * Renders an input element with specified min and max values, updates the input value based on user input,
 * and triggers onUpdate function with the updated input value.
 *
 * @param {InputProps} value - The initial value of the input
 * @param {number} isDisabled - Whether the input is active
 * @param {number} min - The minimum value allowed for the input
 * @param {number} max - The maximum value allowed for the input
 * @param {number} minValue - The minimum value to be displayed
 * @param {number} maxValue - The maximum value to be displayed
 * @param {function} onUpdate - The function to be called when the input value is updated
 * @return {JSX.Element} The input element with specified properties
 */
const Input = ({
  isDisabled,
  isLeft,
  value,
  min,
  max,
  minValue,
  maxValue,
  onUpdate,
}: InputProps) => {
  const [boundedPercentage, setBoundedPercentage] = useState(0);
  const [inputValue, setInputValue] = useState(String(value));
  const inputRef = useRef(Number(inputValue));

  const debouncedInputValue = useDebouncedValue({
    value: inputValue,
    delay: 700,
  });
  const onBoundedUpdate = () => {
    onUpdate({
      refValue: inputRef?.current,
      inputPercentage: boundedPercentage,
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(e.target.value));
  };

  useEffect(() => {
    const boundedValue = getBoundedValue({
      value: Number(debouncedInputValue),
      minLimit: Number(minValue),
      maxLimit: Number(maxValue),
    });
    const percentage = getPercentageFromPriceRange({
      currentPrice: boundedValue,
      minPrice: min,
      maxPrice: max,
    });

    setInputValue(String(boundedValue));
    setBoundedPercentage(percentage);
  }, [debouncedInputValue]);

  useEffect(() => {
    onBoundedUpdate();
  }, [boundedPercentage]);

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  return (
    <input
      id={`${isLeft ? 'left' : 'right'}-input`}
      className={`w-20 rounded-full ${!isDisabled && 'border border-slate-200'} bg-transparent text-center`}
      data-testid={`${isLeft ? 'left' : 'right'}-input`}
      disabled={isDisabled}
      min={min}
      max={max}
      name={`${isLeft ? 'left' : 'right'}-input`}
      onChange={handleInputChange}
      placeholder={String(value)}
      type="number"
      value={inputValue}
    />
  );
};

export default Input;
