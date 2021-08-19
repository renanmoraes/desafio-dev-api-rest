import { Request, Response } from 'express'
import { getMockRes, getMockReq } from '@jest-mock/express'
import {
  userSignUpRequestApplication,
  signUp
} from './user-sign-up-request-presentation'
import userSignUpRequestDouble from '../../infrastructure/user-sign-up-request/double/user-sign-up-request.double'

describe('Apresentação de Cadastro', () => {
  it('Deve criar uma nova conta', async () => {
    // Arrange
    const doubleUserSignUpRequest = userSignUpRequestDouble[0]
    const { res: mockResponse } = getMockRes<Response>()
    const mockRequest = getMockReq<Request>({
      body: doubleUserSignUpRequest,
      query: {}
    })

    userSignUpRequestApplication.signUp = jest
      .fn()
      .mockReturnValue(Promise.resolve(doubleUserSignUpRequest))

    // Act
    const isSignUped = await signUp(mockRequest, mockResponse)

    // Assert
    expect(userSignUpRequestApplication.signUp).toHaveBeenCalledTimes(1)
    expect(userSignUpRequestApplication.signUp).toHaveBeenCalledWith(
      doubleUserSignUpRequest
    )

    expect(isSignUped).toBe(doubleUserSignUpRequest)
  })
})
