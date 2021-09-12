import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTime } from './SensedTime'
import {
  fetchSensedTimes,
  selectSensedTimeIds,
  selectSensedTimesStatus
} from './sensedTimesSlice'

export const SensedTimes = () => {
  const dispatch = useDispatch()
  const sensedTimesStatus = useSelector(selectSensedTimesStatus)
  const sensedTimeIds = useSelector(selectSensedTimeIds)

  useEffect(() => {
    if (
      sensedTimesStatus === RequestStatus.Idle ||
      sensedTimesStatus === RequestStatus.Failed
    ) {
      dispatch(fetchSensedTimes()).unwrap()
    }
  })

  const pastSensedTimes = sensedTimeIds.map(sensedTimeId => (
    <SensedTime key={sensedTimeId} sensedTimeId={sensedTimeId}></SensedTime>
  ))
  return <ol id='pastTimesList'>{pastSensedTimes}</ol>
}
