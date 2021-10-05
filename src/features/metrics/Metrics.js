import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { AverageSensedTime } from './AverageSensedTime'
import {
  selectMetricsStatus,
  fetchMetrics,
  selectMetrics
} from './metricsSlice'

export const Metrics = () => {
  const dispatch = useDispatch()
  const metricsStatus = useSelector(selectMetricsStatus)
  const metrics = useSelector(selectMetrics)

  console.log(metrics)

  useEffect(() => {
    if (
      metricsStatus === RequestStatus.Idle ||
      metricsStatus === RequestStatus.Failed
    ) {
      dispatch(fetchMetrics()).unwrap()
    }
  })

  const averages = Object.keys(metrics).map(key => {
    const { targetTime, total, average } = metrics[key]
    return (
      <AverageSensedTime
        key={key}
        targetTime={targetTime}
        actualTime={average}
        attempts={total}
      ></AverageSensedTime>
    )
  })

  return <ol>{averages}</ol>
}
