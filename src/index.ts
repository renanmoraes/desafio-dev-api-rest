import * as BodyParser from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import { Application, NextFunction, Request, Response } from 'express'
import * as express from 'express'
import * as helmet from 'helmet'
import * as jwt from 'express-jwt'
import config from './shared/cross/config'
import routes from './shared/routes'
import decoder from './shared/middlewares/decoder'
import logger from './shared/cross/logger'
import interceptors from './shared/cross/interceptors'
import { unlessPath } from './shared/unlessPath'
import MongoDbConnectionSingleton from './shared/infrastructure/service/mongo/mongo-db-connection-service'

MongoDbConnectionSingleton.connect()

interceptors.axiosInterceptors()

const server: Application = express()
const PORT = process.env.PORT || 3500

server.use(BodyParser.urlencoded({ extended: false }))
server.use(BodyParser.json({ limit: '10mb' }))

server.use(cors())
server.use(compression())
server.use(helmet())
// Comentado para nao precisar de token
// server.use(
//   jwt({ secret: config.jwt.secret, algorithms: ['HS256'] }).unless(unlessPath)
// )
server.use(decoder)

server.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized')
  }
})

routes.startRoutes(server)

server.listen(PORT, () => {
  logger.info(
    `Server running`,
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`
  )
})
