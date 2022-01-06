import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimeForTargetTimeAndId } from './SensedTimeForTargetTimeAndId'
import {
  fetchSensedTimesByTargetTime,
  selectSensedTimeIdsByTargetTime,
  selectSensedTimesStatus
} from './sensedTimesSlice'
import { Metric } from '../metrics/Metric'
import { selectMetrics } from '../metrics/metricsSlice'

export const SensedTimes = () => {
  const dispatch = useDispatch()
  const sensedTimesStatus = useSelector(selectSensedTimesStatus)
  const sensedTimeIdsByTargetTime = useSelector(selectSensedTimeIdsByTargetTime)
  const metrics = useSelector(selectMetrics)

  const targetTimes = Object.keys(sensedTimeIdsByTargetTime)
  const [showAllTargetTimes, setShowAllTargetTimes] = useState(
    targetTimes.reduce((result, targetTime) => {
      result[targetTime] = false
      return result
    }, {})
  )

  console.log(metrics)

  useEffect(() => {
    if (
      sensedTimesStatus === RequestStatus.Idle ||
      sensedTimesStatus === RequestStatus.Failed
    ) {
      dispatch(fetchSensedTimesByTargetTime()).unwrap()
    }
  })

  const pastSensedTimes = targetTimes.map(targetTime => {
    const allSensedTimeIds = sensedTimeIdsByTargetTime[targetTime]
    const [numToSlice, className] = showAllTargetTimes[targetTime]
      ? [allSensedTimeIds.length, 'selected']
      : [0, 'unselected']
    const sensedTimeIds = sensedTimeIdsByTargetTime[targetTime].slice(
      0,
      numToSlice
    )
    return (
      <div className='sensed-times' key={targetTime}>
        {targetTime in metrics ? (
          <Metric
            key={targetTime}
            {...metrics[targetTime]}
            classNames={[className]}
            onClick={() => {
              setShowAllTargetTimes({
                ...showAllTargetTimes,
                [targetTime]: !showAllTargetTimes[targetTime]
              })
            }}
          ></Metric>
        ) : null}
        {numToSlice !== 0 ? (
          <div className='sensed-times-content'>
            {sensedTimeIds.map(sensedTimeId => {
              console.log(sensedTimeId)
              return (
                <SensedTimeForTargetTimeAndId
                  key={sensedTimeId}
                  targetTime={targetTime}
                  sensedTimeId={sensedTimeId}
                ></SensedTimeForTargetTimeAndId>
              )
            })}
          </div>
        ) : (
          <div className='sensed-times-content no-values'></div>
        )}
      </div>
    )
  })
  return <div>{pastSensedTimes}</div>
}
