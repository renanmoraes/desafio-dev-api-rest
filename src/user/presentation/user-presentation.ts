import { Router, Request, Response } from 'express'
import userValidator from './user-validator'
import logger from '../../shared/cross/logger'
import { AggregatePaginate } from '../../shared/models/aggregate-paginate'
import { User } from '../domain/user/entity/user'
import container from '../../setup'
import SERVICE_IDENTIFIER from '../../service-identifier'
import { UserApplication } from '../application/user-application'
import PaginateFilter from '../../shared/models/paginate-filter'
import ApiResponse from '../../shared/models/api-response'
import {
  HTTP_MESSAGE_DEFAULT_OK,
  HTTP_STATUS_INTERNAL_ERROR,
  HTTP_STATUS_OK
} from '../../shared/constantes'
import { errorValidatorHandler } from '../../shared/joi-helpers'

export const userApplication = container.get<UserApplication>(
  SERVICE_IDENTIFIER.UserApplication
)

/**
 * Obter os usuários
 * @name getUser
 * @public
 * @param {Request} req - dados da requisição http
 * @param {Response} res - resposta da requisição http
 * @returns {Promise<AggregatePaginate<User>>}
 */
export const getUsers = async (
  req: Request,
  res: Response
): Promise<AggregatePaginate<User>> => {
  try {
    const paginateFilter: PaginateFilter = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10
    }

    const odataQuery = req.query.$filter
      ? req.query.$filter.toString()
      : undefined

    const paginate: AggregatePaginate<User> = await userApplication.get(
      odataQuery,
      paginateFilter
    )

    const response = {
      code: HTTP_STATUS_OK,
      message: HTTP_MESSAGE_DEFAULT_OK,
      data: paginate
    } as ApiResponse<AggregatePaginate<User>>

    res.status(HTTP_STATUS_OK).json(response)

    return paginate
  } catch (error) {
    logger.error('getUsers', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })

    return null
  }
}

export const getProfile = async (
  req: Request,
  res: Response
): Promise<ApiResponse<any>> => {
  try {
    const stub = {
      user: {
        id: '5f18f9d069fe170413269a3f',
        ratings: null,
        email: 'pedro04nl@gmail.com',
        profileImage: null
      },
      notification: true,
      appNotification: true
    }

    const response = {
      code: HTTP_STATUS_INTERNAL_ERROR,
      message: HTTP_MESSAGE_DEFAULT_OK,
      data: stub
    } as ApiResponse<any>

    res.status(HTTP_STATUS_INTERNAL_ERROR).json(response)

    return response
  } catch (error) {
    logger.error('getUsers', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })

    return null
  }
}

export default Router()
  .get('/', userValidator.getValidator, errorValidatorHandler, getUsers)

  .get('/profile/me/', getProfile)
