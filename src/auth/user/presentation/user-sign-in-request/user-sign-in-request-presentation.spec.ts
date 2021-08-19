import { Request, Response } from 'express'
import { getMockRes, getMockReq } from '@jest-mock/express'
import {
  userSignInRequestApplication,
  signIn
} from './user-sign-in-request-presentation'
import userSignInRequestDouble from '../../infrastructure/user-sign-in-request/double/user-sign-in-request.double'

describe('Apresentação de Login', () => {
  it('Deve validar credenciais de autentificação', async () => {
    // Arrange
    const doubleUserSignInRequest = userSignInRequestDouble[0]

    const { res: mockResponse } = getMockRes<Response>()
    const mockRequest = getMockReq<Request>({
      body: doubleUserSignInRequest,
      query: {}
    })

    userSignInRequestApplication.signIn = jest
      .fn()
      .mockReturnValue(Promise.resolve(true))

    // Act
    const isSignIned = await signIn(mockRequest, mockResponse)

    // Assert
    expect(userSignInRequestApplication.signIn).toHaveBeenCalledTimes(1)
    expect(userSignInRequestApplication.signIn).toHaveBeenCalledWith(
      doubleUserSignInRequest
    )

    expect(isSignIned).toBe(true)
  })
})
