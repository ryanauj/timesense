import TimeSensor from '../features/sensed-times/TimeSensor'
import { SensedTimesSnippet } from '../features/sensed-times/SensedTimesSnippet'

export const Dashboard = () => (
  <div id='dashboard'>
    <SensedTimesSnippet></SensedTimesSnippet>
    <TimeSensor></TimeSensor>
  </div>
)
