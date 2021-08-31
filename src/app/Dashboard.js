import TimeSensor from '../features/sensed-times/TimeSensor'
import { SensedTimes } from '../features/sensed-times/SensedTimes'
import { AverageSensedTime } from '../features/sensed-times/AverageSensedTime'

export const Dashboard = () => (
  <div id='dashboard'>
    <SensedTimes></SensedTimes>
    <AverageSensedTime></AverageSensedTime>
    <TimeSensor></TimeSensor>
  </div>
)
