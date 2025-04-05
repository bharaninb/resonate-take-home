import { useEffect } from 'react'
import axios from 'axios'

const AxiosConfig = () => {
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:3000/api'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.post['Accept'] = 'application/json'
  })
  return <></>
}

export { AxiosConfig }
