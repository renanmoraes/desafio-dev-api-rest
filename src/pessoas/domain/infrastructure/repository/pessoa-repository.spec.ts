import { PessoaRepositoryImpl } from './pessoa-repository'
import MongoDbConnectionSingleton from '../../../../shared/infrastructure/service/mongo/mongo-db-connection-service';
import pessoasDouble from '../../pessoa/double/pessoa-double';

const pessoaRepository = new PessoaRepositoryImpl()

const toMatchObjectIgnoringCustom = (document) => {
  return {
    ...document,

    // MongoDb Fields
    _id: undefined,
    createdAt: undefined,
    updatedAt: undefined,

    // Auto Generate Fields
    id: undefined
  }
}

const toMatchArrayIgnoringCustom = (documents) =>
  documents.map((document) => toMatchObjectIgnoringCustom(document))

beforeAll(async () => {
  const customUrl = process.env.MONGO_URL
  await MongoDbConnectionSingleton.connect(customUrl)
})

describe('Repositório da Pessoa', () => {
  it('Deve gerar um filtro de consulta no mongodb', () => {
    const doublePessoa = pessoasDouble[0]

    const expectedMongoDbFilter = {
      $and: [{ cpf: doublePessoa.cpf }, { idPessoa: doublePessoa.idPessoa }]
    }

    const doubleOdataQuery = `cpf eq '${doublePessoa.cpf}' and idPessoa eq '${doublePessoa.idPessoa}'`

    const mongoDbFilter = pessoaRepository.filterFactory(doubleOdataQuery)

    expect(mongoDbFilter).toStrictEqual(expectedMongoDbFilter)
  })

  it('Deve criar nova pessoa', async () => {
    const doublePessoas = pessoasDouble

    const isSended = await pessoaRepository.createMany(doublePessoas)

    expect(isSended).toStrictEqual(true)
  })

  it('Deve obter os pessoas paginadas', async () => {
    const doublePessoa = pessoasDouble[0]
    const paginateFilter = {
      page: 1,
      limit: 2
    }
    const doubleOdataQuery = `cpf eq '${doublePessoa.cpf}'`
    const paginate = await pessoaRepository.getPages(
      doubleOdataQuery,
      paginateFilter
    )

    const value = toMatchArrayIgnoringCustom(paginate.docs)
    const expected = toMatchArrayIgnoringCustom([doublePessoa])

    expect(value).toStrictEqual(expected)
  })

  it('Deve obter pessoa no banco de dados por filtro', async () => {
    const doublePessoa = pessoasDouble[0]
    const doubleOdataQuery = `cpf eq '${doublePessoa.cpf}'`

    const pessoa = await pessoaRepository.getOneByFilters(doubleOdataQuery)

    const value = toMatchObjectIgnoringCustom(pessoa)
    const expected = toMatchObjectIgnoringCustom(doublePessoa)

    expect(value).toStrictEqual(expected)
  })
})
