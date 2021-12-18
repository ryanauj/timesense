import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RequestStatus } from '../../app/RequestStatus'
import { Metric } from './Metric'
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

  const metricsComponents = Object.keys(metrics).map(key => {
    return <Metric key={key} {...metrics[key]}></Metric>
  })

  return <div className='metrics-list'>{metricsComponents}</div>
}
