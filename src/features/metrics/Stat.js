import React from 'react'

export const Stat = ({ label, value, classNames = [] }) => {
  let className = 'stat'
  for (let cn of classNames) {
    className += ` ${cn}`
  }
  return (
    <div className={className}>
      <label>{label}: </label>
      <span>{value}</span>
      <hr></hr>
    </div>
  )
}
