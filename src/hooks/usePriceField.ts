import React, { useEffect } from 'react';
import { useState } from 'react';

const INPUT_DELAY = 700;

export const usePriceField = (onchange: (value: number) => void) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onchange(+inputValue) == undefined) {
        if (inputValue) setInputValue('');
      }
    }, INPUT_DELAY);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number.isNaN(Number(value))) return;
    setInputValue(value);
  };

  return { inputValue, onChangeHandler };
};
