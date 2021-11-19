import { SensedTime } from '../sensed-times/SensedTime'

export const Metric = ({
  targetTime,
  average: actualTime,
  total: attempts,
  median,
  min,
  max,
  mostRecent: sensedTimes
}) => {
  const pastSensedTimes = sensedTimes.map((sensedTime, index) => (
    <SensedTime
      key={sensedTime.id}
      index={index}
      sensedTime={sensedTime}
    ></SensedTime>
  ))
  return (
    <li className='metric'>
      <div className='stats'>
        <div className='stat'>
          <label>Target: </label>
          <span>{targetTime}</span>
        </div>
        <div className='stat'>
          <label>Average: </label>
          <span>{formatDecimal(actualTime)}</span>
        </div>
        <div className='stat'>
          <label>Attempts: </label>
          <span>{attempts}</span>
        </div>
        <div className='stat'>
          <label>Median: </label>
          <span>{formatDecimal(median)}</span>
        </div>
        <div className='stat'>
          <label>Min: </label>
          <span>{formatDecimal(min)}</span>
        </div>
        <div className='stat'>
          <label>Max: </label>
          <span>{formatDecimal(max)}</span>
        </div>
      </div>
      <ol className='past-times'>{pastSensedTimes}</ol>
    </li>
  )
}

const formatDecimal = num => num.toFixed(3)
