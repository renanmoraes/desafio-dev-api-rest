import { createValidator } from 'express-joi-validation'
import * as Joi from '@hapi/joi'

const validator = createValidator({
  passError: true
})

const validatorShema = {}

const getQuerySchema = {
  ...validatorShema
}

const getValidator = validator.query(Joi.object(getQuerySchema))

const updateBodyValidator = validator.body(Joi.object(validatorShema))

const createBodyValidator = validator.body(
  Joi.object({
    ...validatorShema,
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    provider: Joi.string().required(),
    token: Joi.string().allow(null)
  })
)

export default {
  getValidator,
  updateBodyValidator,
  createBodyValidator
}
