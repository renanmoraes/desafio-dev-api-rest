import {
  createLogger,
  format
  // transports
} from 'winston'

import config from './config'

const APP = `base-service - ${config.NODE_ENV}`

const Console = require('winston-console-transport')

const { combine, timestamp, json } = format

// const transportFile = fileName => new transports.File({ filename: fileName })

const transporConsole = () => new Console({})

const transportDefault = () => {
  // new transports.Console()
  // switch (process.env.NODE_ENV) {
  //   case 'production': {
  //     return [transporConsole()]
  //   }
  //   default: {
  //     // return transportFile('logs/default.log')
  return [transporConsole()]
  //   }
  // }
}

const defaultWinstonLogger = createLogger({
  format: combine(timestamp(), json()),
  transports: transportDefault()
})

const info = (name, params) => {
  defaultWinstonLogger.log({
    level: 'info',
    message: name,
    meta: { app: APP },
    params
  })
}

const debug = (name, params) => {
  defaultWinstonLogger.log({
    level: 'debug',
    message: name,
    meta: { app: APP },
    params
  })
  return null
}

const error = (name, err) => {
  defaultWinstonLogger.log({
    level: 'error',
    message: name,
    meta: { app: APP },
    err: err.message
  })
}

const logger = {
  info,
  debug,
  error
}

export default logger
