import React, { useEffect } from 'react';
import { useState } from 'react';

type InputFieldType = 'text' | 'number';
type InputValueType<T extends InputFieldType> = T extends 'text' ? string : T extends 'number' ? number : never;
export type DebouncedChangeHandler<T extends InputFieldType> = (value: InputValueType<T>) => InputValueType<T> | null;

export type DebouncedFieldType = <T extends InputFieldType>(props: {
  type: T;
  label: string;
  placeholder: string;
  delay: number;
  onchange: DebouncedChangeHandler<T>;
}) => React.JSX.Element;

export const useDebouncedField = <T extends InputFieldType>(
  type: T,
  onchange: DebouncedChangeHandler<T>,
  delay: number,
) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onchange(fixInputValue(inputValue)) == null) {
        if (inputValue) setInputValue('');
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === 'number') {
      if (Number.isNaN(Number(value))) return;
    }
    setInputValue(value);
  };

  const fixInputValue = (value: string) => {
    switch (type) {
      case 'number':
        return Number(value) as InputValueType<T>;
      case 'text':
        return value as InputValueType<T>;
      default:
        return value as never;
    }
  };

  return { inputValue, onChangeHandler };
};
