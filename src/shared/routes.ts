import { Application, Router, Request, Response } from 'express'
import { HTTP_STATUS_INTERNAL_ERROR, HTTP_STATUS_OK } from './constantes'
import pessoaPresentation from '../pessoas/presentation/pessoa-presentation'

const getHealthApplication = (_req: Request, res: Response) => {
  return res.status(HTTP_STATUS_OK).json({ awsHealth: HTTP_STATUS_OK })
}

const healthPresentation = Router().get('/utils/health', getHealthApplication)

const urlBase = '/api/v1'

const startRoutes = (server: Application) => {
  server.use(`${urlBase}/`, healthPresentation)

  server.use(`${urlBase}/pessoa`, pessoaPresentation)

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
