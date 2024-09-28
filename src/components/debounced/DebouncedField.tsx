import React from 'react';
import { useDebouncedField, DebouncedFieldType } from './useDebouncedField';

export const DebouncedField: DebouncedFieldType = ({ type, label, placeholder, delay, onchange }) => {
  const { inputValue, onChangeHandler } = useDebouncedField(type, onchange, delay);
  return (
    <label>
      <p>{label}</p>
      <input placeholder={placeholder} type="text" value={inputValue} onChange={onChangeHandler} />
    </label>
  );
};
