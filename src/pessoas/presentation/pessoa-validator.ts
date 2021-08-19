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

    idPessoa: Joi.string().allow(null),

    name: Joi.string().required(),
    cpf: Joi.string().required(),

    dataNascimento: Joi.date().allow(null)
  })
)

export default {
  getValidator,
  updateBodyValidator,
  createBodyValidator
}
