export const SensedTime = ({ sensedTime, index }) => (
  <li key={sensedTime.id}>
    <p>{index}</p>
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
