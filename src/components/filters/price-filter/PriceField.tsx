import React, { FC } from 'react';
import { usePriceField } from '../../../hooks/usePriceField';

type PriceFieldProps = {
  label: string;
  placeholder: string;
  onchange: (value: number) => void;
};

export const PriceField: FC<PriceFieldProps> = ({ label, placeholder, onchange }) => {
  const { inputValue, onChangeHandler } = usePriceField(onchange);
  return (
    <label>
      <p>{label}</p>
      <input placeholder={placeholder} type="text" value={inputValue} onChange={onChangeHandler} />
    </label>
  );
};
