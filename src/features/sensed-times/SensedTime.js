import { useSelector } from 'react-redux'
import { selectSensedTimeById } from './sensedTimesSlice'

export const SensedTime = ({ sensedTimeId }) => {
  const sensedTime = useSelector(state =>
    selectSensedTimeById(state, sensedTimeId)
  )
  return (
    <li key={sensedTimeId}>
      <p>
        <label>Target Time: </label>
        <span>{sensedTime.targetTime}</span>
      </p>
      <p>
        <label>Actual Time: </label>
        <span>{sensedTime.actualTime}</span>
      </p>
    </li>
  )
}
