import { Request, Response } from 'express'
import { getMockRes, getMockReq } from '@jest-mock/express'
import userRecoverPasswordRequestDouble from '../../infrastructure/user-recover-password-request/double/user-recover-password-request.double'
import {
  userRecoverPasswordRequestApplication,
  recoverPassword
} from './user-recover-password-request-presentation'

describe('Apresentação de Recuperação de Senha', () => {
  const doubleUserRecoverPasswordRequest = userRecoverPasswordRequestDouble[0]

  it('Deve recuperar senha do usuário', async () => {
    // Arrange
    const { res: mockResponse } = getMockRes<Response>()
    const mockRequest = getMockReq<Request>({
      body: doubleUserRecoverPasswordRequest,
      query: {}
    })

    userRecoverPasswordRequestApplication.sendRecoveryPasswordEmail = jest
      .fn()
      .mockReturnValue(Promise.resolve(true))

    // Act
    const isRecovered = await recoverPassword(mockRequest, mockResponse)

    // Assert
    expect(
      userRecoverPasswordRequestApplication.sendRecoveryPasswordEmail
    ).toHaveBeenCalledTimes(1)

    expect(
      userRecoverPasswordRequestApplication.sendRecoveryPasswordEmail
    ).toHaveBeenCalledWith(doubleUserRecoverPasswordRequest)

    expect(isRecovered).toBe(true)
  })
})
