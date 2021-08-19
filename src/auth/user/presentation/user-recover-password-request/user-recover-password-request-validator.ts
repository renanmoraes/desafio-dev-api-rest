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
    email: Joi.string().required()
  })
)

export default {
  getValidator,
  updateBodyValidator,
  createBodyValidator
}
