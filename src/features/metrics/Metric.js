import { Stat } from './Stat'

export const Metric = ({
  targetTime,
  average: actualTime,
  total: attempts,
  median,
  min,
  max,
  mostRecent: sensedTimes
}) => {
  return (
    <div className='metric'>
      <Stat label='Target' value={targetTime}></Stat>
      <Stat label='Average' value={formatDecimal(actualTime)}></Stat>
      <Stat label='Attempts' value={attempts}></Stat>
      <Stat label='Median' value={formatDecimal(median)}></Stat>
      <Stat label='Min' value={formatDecimal(min)}></Stat>
      <Stat label='Max' value={formatDecimal(max)}></Stat>
    </div>
  )
}

const formatDecimal = num => num.toFixed(3)
