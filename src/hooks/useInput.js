import React, { useState } from 'react';

const useInput =({ type, value }) => {
  const [inputValue, setInputValue] = useState(value);
  const input = <input value={inputValue} onChange={e => setInputValue(e.target.value)} type={type} />;
  return [inputValue, input];
}

export default useInput