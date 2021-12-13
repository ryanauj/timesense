import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimeByTargetTimeAndId } from './SensedTimeByTargetTimeAndId'
import {
  fetchSensedTimes,
  selectSensedTimeIdsByTargetTime,
  selectSensedTimesStatus
} from './sensedTimesSlice'

export const SensedTimesSnippet = () => {
  const dispatch = useDispatch()
  const sensedTimesStatus = useSelector(selectSensedTimesStatus)
  const sensedTimeIdsByTargetTime = useSelector(selectSensedTimeIdsByTargetTime)

  useEffect(() => {
    if (
      sensedTimesStatus === RequestStatus.Idle ||
      sensedTimesStatus === RequestStatus.Failed
    ) {
      dispatch(fetchSensedTimes()).unwrap()
    }
  }, [sensedTimesStatus, dispatch])

  const pastSensedTimes = sensedTimeIdsByTargetTime
    .slice(0, 5)
    .map(sensedTimeId => (
      <SensedTimeByTargetTimeAndId
        key={sensedTimeId}
        sensedTimeId={sensedTimeId}
      ></SensedTimeByTargetTimeAndId>
    ))
  return <ol className='centered-past-times'>{pastSensedTimes}</ol>
}
