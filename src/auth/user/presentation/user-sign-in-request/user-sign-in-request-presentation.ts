import { Router, Request, Response } from 'express'
import userSignInRequestValidator from './user-sign-in-request-validator'
import logger from '../../../../shared/cross/logger'
import { UserSignInRequestApplication } from '../../application/user-sign-in-request/user-sign-in-request-application'
import container from '../../../../setup'
import SERVICE_IDENTIFIER from '../../../../service-identifier'
import ApiResponse from '../../../../shared/models/api-response'
import * as jsonwebtoken from 'jsonwebtoken'
import config from '../../../../shared/cross/config'
import {
  Authorization,
  ClientType
} from '../../../../shared/middlewares/decoder'
import {
  HTTP_MESSAGE_DEFAULT_OK,
  HTTP_STATUS_INTERNAL_ERROR,
  HTTP_STATUS_OK
} from '../../../../shared/constantes'
import { errorValidatorHandler } from '../../../../shared/joi-helpers'

export const userSignInRequestApplication =
  container.get<UserSignInRequestApplication>(
    SERVICE_IDENTIFIER.UserSignInRequestApplication
  )

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const userSignInRequest = req.body

    const cretedUserSignInRequest = await userSignInRequestApplication.signIn(
      userSignInRequest
    )

    const secret = config.jwt.secret
    const token = jsonwebtoken.sign(
      {
        authorization: {
          clientId: cretedUserSignInRequest.id,
          clientType: ClientType.User
        } as Authorization
      },
      secret
    )

    const response = {
      code: HTTP_STATUS_OK,
      message: HTTP_MESSAGE_DEFAULT_OK,
      data: {
        token
      }
    } as ApiResponse<{ token: string }>

    res.status(HTTP_STATUS_OK).json(response)

    return cretedUserSignInRequest
  } catch (error) {
    logger.error('signIn', error)

    res
      .status(HTTP_STATUS_INTERNAL_ERROR)
      .json({ message: error.message, code: HTTP_STATUS_INTERNAL_ERROR })
  }
}

export default Router().post(
  '/',
  userSignInRequestValidator.createBodyValidator,
  errorValidatorHandler,
  signIn
)
