import { Router, Request, Response } from 'express'
import { UserRecoverPasswordRequest } from '../../infrastructure/user-recover-password-request/value/user-recover-password-request'
import ApiResponse from '../../../../shared/models/api-response'
import logger from '../../../../shared/cross/logger'
import userRecoverPasswordRequestValidator from './user-recover-password-request-validator'
import { UserRecoverPasswordRequetApplication } from '../../application/user-recover-password-request/user-recover-password-request-application'
import container from '../../../../setup'
import SERVICE_IDENTIFIER from '../../../../service-identifier'
import {
  HTTP_MESSAGE_DEFAULT_OK,
  HTTP_STATUS_INTERNAL_ERROR,
  HTTP_STATUS_OK
} from '../../../../shared/constantes'
import { errorValidatorHandler } from '../../../../shared/joi-helpers'

export const userRecoverPasswordRequestApplication =
  container.get<UserRecoverPasswordRequetApplication>(
    SERVICE_IDENTIFIER.UserRecoverPasswordRequetApplication
  )

export const recoverPassword = async (
  req: Request,
  res: Response
): Promise<boolean> => {
  try {
    const userRecoverPasswordRequest = req.body as UserRecoverPasswordRequest

    const isCretedUserRecoverPasswordRequest =
      await userRecoverPasswordRequestApplication.sendRecoveryPasswordEmail(
        userRecoverPasswordRequest
      )

    const response = {
      code: HTTP_STATUS_OK,
      message: HTTP_MESSAGE_DEFAULT_OK,
      data: isCretedUserRecoverPasswordRequest
    } as ApiResponse<boolean>

    res.status(HTTP_STATUS_OK).json(response)

    return isCretedUserRecoverPasswordRequest
  } catch (error) {
    logger.error('recoverPassword', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })

    return false
  }
}

export default Router().post(
  '/',
  userRecoverPasswordRequestValidator.createBodyValidator,
  errorValidatorHandler,
  recoverPassword
)
