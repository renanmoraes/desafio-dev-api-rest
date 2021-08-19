import { Pessoa } from '../../domain/pessoa/entity/pessoa'
import { createFilter } from 'odata-v4-mongodb'
import { injectable } from 'inversify'
import { AggregatePaginate } from '../../../shared/models/aggregate-paginate'
import PessoaModel from './pessoa-model'
import logger from '../../../shared/cross/logger'

export interface PessoaRepository {
  getPages(
    odataQuery: string,
    paginateFilter
  ): Promise<AggregatePaginate<Pessoa>>

  getOneByFilters(odataQuery: string): Promise<Pessoa>

  createMany(pessoas: Pessoa[]): Promise<boolean>
}

@injectable()
export class PessoaRepositoryImpl implements PessoaRepository {
  pessoaFactory(document): Pessoa {
    if (document) {
      const model = {
        ...document
      }

      delete model._id
      delete model.createdAt
      delete model.updatedAt

      return model as Pessoa
    }
    return null
  }

  filterFactory(odataFilter: string) {
    return createFilter(odataFilter)
  }

  async getPages(
    odataQuery: string,
    paginateFilter
  ): Promise<AggregatePaginate<Pessoa>> {
    const filter = this.filterFactory(odataQuery)

    const aggregate = PessoaModel.aggregate([
      { $match: { ...filter } },
      { $sort: { partner: 1 } }
    ])

    const result = await PessoaModel.aggregatePaginate(
      aggregate,
      paginateFilter
    )

    return {
      ...result,
      docs: result.docs.map((document) => this.pessoaFactory(document))
    }
  }

  async getOneByFilters(odataQuery: string): Promise<Pessoa> {
    const filter = this.filterFactory(odataQuery)
    const document = await PessoaModel.findOne(filter).lean()
    return this.pessoaFactory(document)
  }

  async createMany(pessoas: Pessoa[]): Promise<boolean> {
    try {
      await PessoaModel.create(pessoas)
      return true
    } catch (error) {
      logger.error('PessoaRepository - createMany', error)
      return false
    }
  }
}
