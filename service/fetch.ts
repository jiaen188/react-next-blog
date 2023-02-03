import axios from 'axios'

const requestInstance = axios.create({
  baseURL: '/',
  timeout: 3000
});

requestInstance.interceptors.request.use(config => config, error => Promise.reject(error));

requestInstance.interceptors.response.use(res => {
  if (res?.status === 200) {
    return res?.data
  } else {
    return {
      code: -1,
      message: '错',
      data: null
    }
  }
}, error => Promise.reject(error));

export default requestInstance;