import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { SensedTimeById } from './SensedTimeById'
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

  const pastSensedTimes = sensedTimeIds.map((sensedTimeId, index) => (
    <SensedTimeById
      key={sensedTimeId}
      index={index}
      sensedTimeId={sensedTimeId}
    ></SensedTimeById>
  ))
  return <ol className='centered-past-times'>{pastSensedTimes}</ol>
}
