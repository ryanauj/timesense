import React, { useState } from 'react'

const useInput = ({ type, initialValue, ...props }) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputComponent = (
    <input
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      type={type}
      {...props}
    />
  )
  return [inputValue, inputComponent, setInputValue]
}

export default useInput
