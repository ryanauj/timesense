import React, { useState } from 'react'

const useInput = ({ type, initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputComponent = (
    <input
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      type={type}
    />
  )
  return [inputValue, inputComponent, setInputValue]
}

export default useInput
