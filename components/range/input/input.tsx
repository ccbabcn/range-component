import { useEffect, useRef, useState } from 'react';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import { getBoundedValue, getPercentageFromPriceRange } from '@/utils/utils';
import { InputProps } from '@/types/range';

/**
 * Renders an input element with specified min and max values, updates the input value based on user input,
 * and triggers onUpdate function with the updated input value.
 *
 * @param {InputProps} value - The initial value of the input
 * @param {number} min - The minimum value allowed for the input
 * @param {number} max - The maximum value allowed for the input
 * @param {number} minValue - The minimum value to be displayed
 * @param {number} maxValue - The maximum value to be displayed
 * @param {function} onUpdate - The function to be called when the input value is updated
 * @return {JSX.Element} The input element with specified properties
 */
const Input = ({
  value,
  min,
  max,
  minValue,
  maxValue,
  onUpdate,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(String(value));
  const inputRef = useRef(Number(inputValue));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(e.target.value));
  };

  const [boundedPercentage, setBoundedPercentage] = useState(0);
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
      className="w-12 text-center"
      type="number"
      id="left-input"
      name="left-input"
      min={min}
      max={max}
      placeholder={String(value)}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default Input;
