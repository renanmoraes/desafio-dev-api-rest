import { inject, injectable } from 'inversify'
import SERVICE_IDENTIFIER from '../../service-identifier'
import { AggregatePaginate } from '../../shared/models/aggregate-paginate'
import { User } from '../domain/user/entity/user'
import { UserRepository } from '../infrastructure/repository/user-repository'

export interface UserApplication {
  /**
   * Obter os usuários
   * @name get
   * @public
   * @param {string} odataQuery - string de consulta odata
   * @param {any} paginateFilter - paginação
   * @returns {Promise<MongooseDocument[]>}
   */
  get(odataQuery: string, paginateFilter): Promise<AggregatePaginate<User>>

  /**
   * Obter usuário por email
   * @name getByEmail
   * @public
   * @param {string} email - email do usuário
   * @returns {Promise<User>}
   */
  getByEmail(email: string): Promise<User>

  /**
   * Obter usuário por id
   * @name getById
   * @public
   * @param {string} id - id
   * @returns {Promise<User>}
   */
  getById(id: string): Promise<User>
}

@injectable()
export class UserApplicationImpl implements UserApplication {
  private readonly _userRepository: UserRepository

  constructor(
    @inject(SERVICE_IDENTIFIER.UserRepository) userRepository: UserRepository
  ) {
    this._userRepository = userRepository
  }

  get(odataQuery: string, paginateFilter): Promise<AggregatePaginate<User>> {
    return this._userRepository.getPages(odataQuery, paginateFilter)
  }

  getById(id: string): Promise<User> {
    const odataQuery = `id eq '${id}'`
    return this._userRepository.getOneByFilters(odataQuery)
  }

  getByEmail(email: string): Promise<User> {
    const odataQuery = `email eq '${email}'`
    return this._userRepository.getOneByFilters(odataQuery)
  }
}
