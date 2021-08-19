import { Pessoa } from './../domain/pessoa/entity/pessoa'
import { Router, Request, Response } from 'express'
import pessoaValidator from './pessoa-validator'
import logger from '../../shared/cross/logger'
import { AggregatePaginate } from '../../shared/models/aggregate-paginate'
import container from '../../setup'
import SERVICE_IDENTIFIER from '../../service-identifier'
import PaginateFilter from '../../shared/models/paginate-filter'
import ApiResponse from '../../shared/models/api-response'
import {
  HTTP_MESSAGE_DEFAULT_OK,
  HTTP_STATUS_INTERNAL_ERROR,
  HTTP_STATUS_OK
} from '../../shared/constantes'
import { errorValidatorHandler } from '../../shared/joi-helpers'
import { PessoaApplication } from '../application/pessoa-application'

export const pessoaApplication = container.get<PessoaApplication>(
  SERVICE_IDENTIFIER.PessoaApplication
)

/**
 * Obter os usuários
 * @name getPessoa
 * @public
 * @param {Request} req - dados da requisição http
 * @param {Response} res - resposta da requisição http
 * @returns {Promise<AggregatePaginate<Pessoa>>}
 */
export const getPessoas = async (
  req: Request,
  res: Response
): Promise<AggregatePaginate<Pessoa>> => {
  try {
    const paginateFilter: PaginateFilter = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    }

    const odataQuery = req.query.$filter
      ? req.query.$filter.toString()
      : undefined

    const paginate: AggregatePaginate<Pessoa> = await pessoaApplication.get(
      odataQuery,
      paginateFilter
    )

    const response = {
      code: HTTP_STATUS_OK,
      message: HTTP_MESSAGE_DEFAULT_OK,
      data: paginate
    } as ApiResponse<AggregatePaginate<Pessoa>>

    res.status(HTTP_STATUS_OK).json(response)

    return paginate
  } catch (error) {
    logger.error('getPessoas', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })

    return null
  }
}

export default Router().get(
  '/',
  pessoaValidator.getValidator,
  errorValidatorHandler,
  getPessoas
)
