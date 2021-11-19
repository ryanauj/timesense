import { useSelector } from 'react-redux'
import { selectSensedTimeById } from './sensedTimesSlice'
import { SensedTime } from './SensedTime'

export const SensedTimeById = ({ sensedTimeId, index }) => {
  const sensedTime = useSelector(state =>
    selectSensedTimeById(state, sensedTimeId)
  )

  return <SensedTime sensedTime={sensedTime} index={index}></SensedTime>
}
