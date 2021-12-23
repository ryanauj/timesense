import { Stat } from './Stat'

export const Metric = ({
  targetTime,
  average: actualTime,
  total: attempts,
  median,
  min,
  max,
  mostRecent: sensedTimes,
  onClick,
  classNames
}) => {
  let className = 'metric'
  for (let cn of classNames) {
    className += ` ${cn}`
  }
  return (
    <div className={className} onClick={onClick}>
      <Stat
        label='Target'
        value={<b>{targetTime}</b>}
        classNames={['target']}
      ></Stat>
      <Stat label='Average' value={formatDecimal(actualTime)}></Stat>
      <Stat label='Attempts' value={attempts}></Stat>
      <Stat label='Median' value={formatDecimal(median)}></Stat>
      <Stat label='Min' value={formatDecimal(min)}></Stat>
      <Stat label='Max' value={formatDecimal(max)}></Stat>
    </div>
  )
}

const formatDecimal = num => num.toFixed(3)
