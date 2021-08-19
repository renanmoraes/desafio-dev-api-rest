import { Request, Response } from 'express'
import { getMockRes, getMockReq } from '@jest-mock/express'
import { userApplication, getUsers } from './user-presentation'
import usersDouble from '../domain/user/double/user-double'

describe('Apresentação do Usuários', () => {
  it('Deve obter os usuários', async () => {
    const doubleUser = usersDouble[0]
    const doubleUsers = usersDouble.filter(
      (double) => double.email === doubleUser.email
    )

    const { res: mockResponse } = getMockRes<Response>()
    const mockRequest = getMockReq<Request>({
      body: {},
      query: {
        page: 1,
        limit: 2,
        $filter: `email eq ${doubleUser.email}`
      }
    })

    const doublePaginateFilter = {
      page: Number(mockRequest.query.page) || 1,
      limit: Number(mockRequest.query.limit) || 10
    }

    const doubleOdataQuery = mockRequest.query.$filter

    userApplication.get = jest
      .fn()
      .mockReturnValue(Promise.resolve({ docs: [doubleUser] }))

    const value = await getUsers(mockRequest, mockResponse)

    expect(userApplication.get).toHaveBeenCalledTimes(1)

    expect(userApplication.get).toHaveBeenCalledWith(
      doubleOdataQuery,
      doublePaginateFilter
    )

    expect(value).toStrictEqual({ docs: doubleUsers })
  })
})
