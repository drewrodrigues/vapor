import axios from 'axios'

export const getStats = () => {
  return axios
    .get('/api/users/stats')
}