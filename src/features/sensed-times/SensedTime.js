export const SensedTime = ({ sensedTime }) => (
  <li className='sensed-time' key={sensedTime.id}>
    <span>{sensedTime.actualTime}</span>
  </li>
)
