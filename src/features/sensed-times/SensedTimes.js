import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimeForTargetTimeAndId } from './SensedTimeForTargetTimeAndId'
import {
  fetchSensedTimesByTargetTime,
  selectSensedTimeIdsByTargetTime,
  selectSensedTimesStatus
} from './sensedTimesSlice'

export const SensedTimes = () => {
  const dispatch = useDispatch()
  const sensedTimesStatus = useSelector(selectSensedTimesStatus)
  const sensedTimeIdsByTargetTime = useSelector(selectSensedTimeIdsByTargetTime)

  const targetTimes = Object.keys(sensedTimeIdsByTargetTime)
  const [showAllTargetTimes, setShowAllTargetTimes] = useState(
    targetTimes.reduce((result, targetTime) => {
      result[targetTime] = false
      return result
    }, {})
  )

  useEffect(() => {
    if (
      sensedTimesStatus === RequestStatus.Idle ||
      sensedTimesStatus === RequestStatus.Failed
    ) {
      dispatch(fetchSensedTimesByTargetTime()).unwrap()
    }
  })

  console.log(sensedTimeIdsByTargetTime)

  const pastSensedTimes = targetTimes.map(targetTime => {
    const allSensedTimeIds = sensedTimeIdsByTargetTime[targetTime]
    const [numToSlice, triangleIcon] = showAllTargetTimes[targetTime]
      ? [allSensedTimeIds.length, <>&#9652;</>]
      : [5, <>&#9660;</>]
    const sensedTimeIds = sensedTimeIdsByTargetTime[targetTime].slice(
      0,
      numToSlice
    )
    console.log(sensedTimeIds)
    return (
      <div className='sensed-times' key={targetTime}>
        <h4
          onClick={() => {
            setShowAllTargetTimes({
              ...showAllTargetTimes,
              [targetTime]: !showAllTargetTimes[targetTime]
            })
          }}
        >
          <b>
            {triangleIcon} Target Time: {targetTime}
          </b>
        </h4>
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
      </div>
    )
  })
  return <div>{pastSensedTimes}</div>
}
