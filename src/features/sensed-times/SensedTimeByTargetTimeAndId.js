import { useSelector } from 'react-redux'
import { selectSensedTimeByTargetTimeAndId } from './sensedTimesSlice'
import { SensedTime } from './SensedTime'

export const SensedTimeByTargetTimeAndId = ({ targetTime, sensedTimeId }) => {
  const sensedTime = useSelector(state =>
    selectSensedTimeByTargetTimeAndId(state, targetTime, sensedTimeId)
  )

  return <SensedTime sensedTime={sensedTime}></SensedTime>
}
