import { HTTP_STATUS_BAD_REQUEST } from './constantes'
import { createValidator } from 'express-joi-validation'

const validator = createValidator({
  passError: true
})

export const factoryQueryValidator = (schema: any) => validator.query(schema)

export const factoryBodyValidator = (schema: any) => validator.body(schema)

export const getEnumValues = (e: any) => {
  return typeof e === 'object' ? Object.keys(e).map((key) => e[key]) : []
}

export const errorValidatorHandler = (
  err: any,
  _req: any,
  res: any,
  next: any
) => {
  if (err) {
    const responseData = {
      code: HTTP_STATUS_BAD_REQUEST,
      message:
        err.error && err.error.message
          ? err.error.message
          : 'Erro de validação inesperado.',
      errors: err.error && err.error.details ? err.error.details : {}
    }
    res.status(HTTP_STATUS_BAD_REQUEST).json(responseData)
  } else {
    next()
  }
}
