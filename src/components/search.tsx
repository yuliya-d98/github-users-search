import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

type SearchPropsType = {
  value: string;
  onSubmit: (searchTerm: string) => void;
};

export const Search = (props: SearchPropsType) => {
  const { onSubmit, value } = props;

  const [tempSearch, setTempSearch] = useState('');

  useEffect(() => {
    setTempSearch(value);
  }, [value]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTempSearch(value);
  };

  return (
    <div>
      <input placeholder="search" value={tempSearch} onChange={onInputChange} />
      <button onClick={() => onSubmit(tempSearch)}>find</button>
    </div>
  );
};
