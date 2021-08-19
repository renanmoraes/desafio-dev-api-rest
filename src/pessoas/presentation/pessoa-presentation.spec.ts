import { Request, Response } from 'express'
import { getMockRes, getMockReq } from '@jest-mock/express'
import pessoasDouble from '../domain/pessoa/double/pessoa-double'
import { pessoaApplication, getPessoas } from './pessoa-presentation'

describe('Apresentação de Pessoas', () => {
  it('Deve obter os pessoas', async () => {
    const doublePessoa = pessoasDouble[0]
    const doublePessoas = pessoasDouble.filter(
      (double) => double.cpf === doublePessoa.cpf
    )

    const { res: mockResponse } = getMockRes<Response>()
    const mockRequest = getMockReq<Request>({
      body: {},
      query: {
        page: 1,
        limit: 2,
        $filter: `cpf eq ${doublePessoa.cpf}`
      }
    })

    const doublePaginateFilter = {
      page: Number(mockRequest.query.page) || 1,
      limit: Number(mockRequest.query.limit) || 10
    }

    const doubleOdataQuery = mockRequest.query.$filter

    pessoaApplication.get = jest
      .fn()
      .mockReturnValue(Promise.resolve({ docs: [doublePessoa] }))

    const value = await getPessoas(mockRequest, mockResponse)

    expect(pessoaApplication.get).toHaveBeenCalledTimes(1)

    expect(pessoaApplication.get).toHaveBeenCalledWith(
      doubleOdataQuery,
      doublePaginateFilter
    )

    expect(value).toStrictEqual({ docs: doublePessoas })
  })
})
