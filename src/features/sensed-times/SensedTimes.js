import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimeByTargetTimeAndId } from './SensedTimeByTargetTimeAndId'
import {
  fetchSensedTimesByTargetTime,
  selectSensedTimeIdsByTargetTime,
  selectSensedTimesStatus
} from './sensedTimesSlice'

export const SensedTimes = () => {
  const dispatch = useDispatch()
  const sensedTimesStatus = useSelector(selectSensedTimesStatus)
  const sensedTimeIdsByTargetTime = useSelector(selectSensedTimeIdsByTargetTime)

  useEffect(() => {
    if (
      sensedTimesStatus === RequestStatus.Idle ||
      sensedTimesStatus === RequestStatus.Failed
    ) {
      dispatch(fetchSensedTimesByTargetTime()).unwrap()
    }
  })

  console.log(sensedTimeIdsByTargetTime)

  const pastSensedTimes = Object.keys(sensedTimeIdsByTargetTime).map(
    targetTime => {
      const sensedTimeIds = sensedTimeIdsByTargetTime[targetTime]
      console.log(sensedTimeIds)
      return (
        <div className='sensed-times' key={targetTime}>
          <h4>Target Time: {targetTime}</h4>
          <div className='sensed-times-content'>
            {sensedTimeIds.map(sensedTimeId => {
              console.log(sensedTimeId)
              return (
                <SensedTimeByTargetTimeAndId
                  key={sensedTimeId}
                  targetTime={targetTime}
                  sensedTimeId={sensedTimeId}
                ></SensedTimeByTargetTimeAndId>
              )
            })}
          </div>
        </div>
      )
    }
  )
  return <div>{pastSensedTimes}</div>
}
