import { createFilter } from 'odata-v4-mongodb'
import { injectable } from 'inversify'
import { AggregatePaginate } from '../../../shared/models/aggregate-paginate'
import { User } from '../../domain/user/entity/user'
import logger from '../../../shared/cross/logger'
import UserModel from './user-model'

export interface UserRepository {

  getPages(odataQuery: string, paginateFilter): Promise<AggregatePaginate<User>>

  getOneByFilters(odataQuery: string): Promise<User>

  createMany(users: User[]): Promise<boolean>
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  userFactory(document): User {
    if (document) {
      const model = {
        ...document,
        ratings:
          document.ratings && document.ratings.length > 0
            ? document.ratings
            : null
      }

      delete model._id
      delete model.createdAt
      delete model.updatedAt

      return model as User
    }
    return null
  }

  filterFactory(odataFilter: string) {
    return createFilter(odataFilter)
  }

  async getPages(
    odataQuery: string,
    paginateFilter
  ): Promise<AggregatePaginate<User>> {
    const filter = this.filterFactory(odataQuery)

    const aggregate = UserModel.aggregate([
      { $match: { ...filter } },
      { $sort: { partner: 1 } }
    ])

    const result = await UserModel.aggregatePaginate(aggregate, paginateFilter)

    return {
      ...result,
      docs: result.docs.map((document) => this.userFactory(document))
    }
  }

  async getOneByFilters(odataQuery: string): Promise<User> {
    const filter = this.filterFactory(odataQuery)
    const document = await UserModel.findOne(filter).lean()
    return this.userFactory(document)
  }

  async createMany(users: User[]): Promise<boolean> {
    try {
      await UserModel.create(users)
      return true
    } catch (error) {
      logger.error('UserRepository - createMany', error)
      return false
    }
  }
}
