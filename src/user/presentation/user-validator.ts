import { createValidator } from 'express-joi-validation'
import * as Joi from '@hapi/joi'

const validator = createValidator({
  passError: true
})

const validatorShema = {}

const getQuerySchema = {
  ...validatorShema,

  // Data e Hora de Criação
  createdAt: Joi.string(),
  // Data e Hora de Atualização
  updatedAt: Joi.string(),

  page: Joi.number(),
  limit: Joi.number(),
  $filter: Joi.string()
}

const getValidator = validator.query(Joi.object(getQuerySchema))

const updateBodyValidator = validator.body(Joi.object(validatorShema))

const createBodyValidator = validator.body(
  Joi.object({
    ...validatorShema,

    id: Joi.string().allow(null),

    email: Joi.string().required(),
    password: Joi.string().required(),

    profileImage: Joi.string().allow(null),

    ratings: Joi.object()
      .keys({
        rating: Joi.date().required(),
        momentTime: Joi.date().required()
      })
      .allow(null)
  })
)

export default {
  getValidator,
  updateBodyValidator,
  createBodyValidator
}
