export const AverageSensedTime = () => (
  <>
    <button id='toggleAverage' style={{ backgroundColor: 'darkslategrey' }}>
      Average
    </button>
    <div id='average' style={{ visibility: 'hidden' }}>
      <label>Average Target Time:</label>
      <p id='averageTargetTime'></p>
      <label>Average Actual Time:</label>
      <p id='averageActualTime'></p>
    </div>
  </>
)
