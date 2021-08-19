import axios from 'axios'
import logger from './logger'

const axiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      const logRequest = {
        method: response.request.method,
        path: response.request.path,
        statusCode: response.request.res.statusCode,
        statusMessage: response.request.res.statusMessage,
        headers: response.request.res.headers,
        params: response.request.res.params,
        query: response.request.res.query,
        url: response.request.res.responseUrl,
        statusText: response.request.res.statusText,
        baseUrl: response.request.res.baseUrl,
        originalUrl: response.request.res.originalUrl
      }

      logger.info(
        `Axios interceptor info - request - ${response.config.url}`,
        logRequest
      )

      return response
    },
    (error) => {
      if (error.request.res) {
        const logRequest = {
          method: error.request.method,
          path: error.request.path,
          statusCode: error.request.res.statusCode,
          statusMessage: error.request.res.statusMessage,
          headers: error.request.res.headers,
          url: error.request.responseUrl,
          param: error.request.res.statusText,
          baseUrl: error.request.res.baseUrl,
          originalUrl: error.request.res.originalUrl,
          params: error.request.res.params,
          query: error.request.res.query
        }

        logger.error(
          `Axios interceptor error - request - ${error.config.url}`,
          logRequest
        )
      }
      return Promise.reject(error)
    }
  )

  axios.interceptors.request.use(
    (config) => {
      const token = ''
      // eslint-disable-next-line no-param-reassign
      config.headers['x-hubin-access-token'] = `${token}`
      return config
    },
    (error) => Promise.reject(error)
  )

  // axios.interceptors.request.use(
  //   config => {
  //     const token = ''
  //     config.headers['x-hubin-access-token'] = `${token}`
  //     return config
  //   },
  //   error => Promise.reject(error)
  // )
}

const interceptors = {
  axiosInterceptors
}

export default interceptors
