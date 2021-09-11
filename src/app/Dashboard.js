import TimeSensor from '../features/sensed-times/TimeSensor'
import { SensedTimesSnippet } from '../features/sensed-times/SensedTimesSnippet'
import { AverageSensedTime } from '../features/sensed-times/AverageSensedTime'

export const Dashboard = () => (
  <div id='dashboard'>
    <SensedTimesSnippet></SensedTimesSnippet>
    <AverageSensedTime></AverageSensedTime>
    <TimeSensor></TimeSensor>
  </div>
)
