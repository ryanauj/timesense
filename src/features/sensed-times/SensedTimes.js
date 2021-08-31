import { useSelector } from 'react-redux'
import { SensedTime } from './SensedTime'
import { selectSensedTimeIds } from './sensedTimesSlice'

export const SensedTimes = () => {
  const sensedTimeIds = useSelector(selectSensedTimeIds)
  const pastSensedTimes = sensedTimeIds.map(sensedTimeId => (
    <SensedTime sensedTimeId={sensedTimeId}></SensedTime>
  ))
  return <ol id='pastTimesList'>{pastSensedTimes}</ol>
}
