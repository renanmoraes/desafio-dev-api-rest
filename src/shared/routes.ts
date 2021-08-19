import { Application, Router, Request, Response } from 'express'

import userPresentation from '../user/presentation/user-presentation'

import userSignInRequestPresentation from '../auth/user/presentation/user-sign-in-request/user-sign-in-request-presentation'
import userSignUpRequestPresentation from '../auth/user/presentation/user-sign-up-request/user-sign-up-request-presentation'
import userRecoverPasswordRequestPresentation from '../auth/user/presentation/user-recover-password-request/user-recover-password-request-presentation'

import { HTTP_STATUS_INTERNAL_ERROR, HTTP_STATUS_OK } from './constantes'

const getHealthApplication = (_req: Request, res: Response) => {
  return res.status(HTTP_STATUS_OK).json({ awsHealth: HTTP_STATUS_OK })
}

const healthPresentation = Router().get('/utils/health', getHealthApplication)

const urlBase = '/api/v1'

const startRoutes = (server: Application) => {
  server.use(`${urlBase}/`, healthPresentation)

  server.use(
    `${urlBase}/auth/user/sign-up-request`,
    userSignUpRequestPresentation
  )
  server.use(
    `${urlBase}/auth/user/sign-in-request`,
    userSignInRequestPresentation
  )
  server.use(
    `${urlBase}/auth/user/recover-password-request`,
    userRecoverPasswordRequestPresentation
  )

  server.use(`${urlBase}/user`, userPresentation)

  server.use((req, res, next) => {
    res.status(HTTP_STATUS_INTERNAL_ERROR).json({
      status: HTTP_STATUS_INTERNAL_ERROR,
      msg: `Error on route. This route exist?`,
      route: req.originalUrl
    })
    next()
  })
}

const routes = { startRoutes }

export default routes
