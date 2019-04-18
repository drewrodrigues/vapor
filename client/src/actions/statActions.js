import * as statUtil from '../util/statUtil'

export const RECEIVE_STATS = "RECEIVE_STATS"

const receiveStats = stats => {
  return {
    type: RECEIVE_STATS,
    stats
  }
}

export const getStats = stats => dispatch => {
  return statUtil.getStats()
    .then(res => dispatch(receiveStats(res.data)))
}
