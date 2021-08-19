import { Router, Request, Response } from 'express'
import userSignUpRequestValidator from './user-sign-up-request-validator'
import logger from '../../../../shared/cross/logger'
import { UserSignUpRequestApplicationImpl } from '../../application/user-sign-up-request/user-sign-up-request-application'
import container from '../../../../setup'
import SERVICE_IDENTIFIER from '../../../../service-identifier'
import { UserRepository } from '../../../../user/infrastructure/repository/user-repository'
import { UserAuthService } from '../../../../shared/infrastructure/service/user-auth/user-auth.service'
import ApiResponse from '../../../../shared/models/api-response'
import {
  HTTP_MESSAGE_DEFAULT_CREATED,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_INTERNAL_ERROR
} from '../../../../shared/constantes'
import { errorValidatorHandler } from '../../../../shared/joi-helpers'

const userAuthService = container.get<UserAuthService>(
  SERVICE_IDENTIFIER.UserAuthService
)
const userRepository = container.get<UserRepository>(
  SERVICE_IDENTIFIER.UserRepository
)

export const userSignUpRequestApplication =
  new UserSignUpRequestApplicationImpl(userAuthService, userRepository)

export const signUp = async (req: Request, res: Response): Promise<boolean> => {
  try {
    const userSignUpRequest = req.body

    const isCreated = await userSignUpRequestApplication.signUp(
      userSignUpRequest
    )

    if (!isCreated) {
      throw Error('Erro.')
    }

    const response = {
      code: HTTP_STATUS_CREATED,
      message: HTTP_MESSAGE_DEFAULT_CREATED,
      data: isCreated
    } as ApiResponse<boolean>

    res.status(HTTP_STATUS_CREATED).json(response)

    return isCreated
  } catch (error) {
    logger.error('signUp', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })

    return false
  }
}

export default Router().post(
  '/',
  userSignUpRequestValidator.createBodyValidator,
  errorValidatorHandler,
  signUp
)
