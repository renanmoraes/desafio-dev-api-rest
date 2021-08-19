import usersDouble from '../../domain/user/double/user-double'
import { UserRepositoryImpl } from './user-repository'
import MongoDbConnectionSingleton from '../../../shared/infrastructure/service/mongo/mongo-db-connection-service'

const userRepository = new UserRepositoryImpl()

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

describe('Repositório do Usuários', () => {
  it('Deve gerar um filtro de consulta no mongodb', () => {
    const doubleUser = usersDouble[0]

    const expectedMongoDbFilter = {
      $and: [{ email: doubleUser.email }, { id: doubleUser.id }]
    }
    const doubleOdataQuery = `email eq '${doubleUser.email}' and id eq '${doubleUser.id}'`

    const mongoDbFilter = userRepository.filterFactory(doubleOdataQuery)

    expect(mongoDbFilter).toStrictEqual(expectedMongoDbFilter)
  })

  it('Deve criar novos usuários', async () => {
    const doubleUsers = usersDouble

    const isSended = await userRepository.createMany(doubleUsers)

    expect(isSended).toStrictEqual(true)
  })

  it('Deve obter os usuários paginados', async () => {
    const doubleUser = usersDouble[0]
    const paginateFilter = {
      page: 1,
      limit: 2
    }
    const doubleOdataQuery = `email eq '${doubleUser.email}'`
    const paginate = await userRepository.getPages(
      doubleOdataQuery,
      paginateFilter
    )

    const value = toMatchArrayIgnoringCustom(paginate.docs)
    const expected = toMatchArrayIgnoringCustom([doubleUser])

    expect(value).toStrictEqual(expected)
  })

  it('Deve obter usuários no banco de dados por filtro', async () => {
    const doubleUser = usersDouble[0]
    const doubleOdataQuery = `email eq '${doubleUser.email}'`

    const user = await userRepository.getOneByFilters(doubleOdataQuery)

    const value = toMatchObjectIgnoringCustom(user)
    const expected = toMatchObjectIgnoringCustom(doubleUser)

    expect(value).toStrictEqual(expected)
  })
})
