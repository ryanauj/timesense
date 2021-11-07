import React, { useState } from 'react'

const useInput = ({ type, initialValue, id, className }) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputComponent = (
    <input
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      type={type}
      id={id}
      className={className}
    />
  )
  return [inputValue, inputComponent, setInputValue]
}

export default useInput
