export const AverageSensedTime = ({ targetTime, actualTime, attempts }) => (
  <li id='average'>
    <label>Target Time:</label>
    <p id='targetTime'>{targetTime}</p>
    <label>Average Time:</label>
    <p id='averageTime'>{actualTime}</p>
    <label>Attempts:</label>
    <p id='attempts'>{attempts}</p>
  </li>
)
