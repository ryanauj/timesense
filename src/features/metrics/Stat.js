import React from 'react'

export const Stat = ({ label, value }) => {
  return (
    <div className='stat'>
      <label>{label}: </label>
      <span>{value}</span>
    </div>
  )
}
