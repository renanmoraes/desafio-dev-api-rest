import { inject, injectable } from 'inversify'
import SERVICE_IDENTIFIER from '../../service-identifier'
import { AggregatePaginate } from '../../shared/models/aggregate-paginate'
import { Pessoa } from '../domain/pessoa/entity/pessoa'
import { PessoaRepository } from '../infrastructure/repository/pessoa-repository'

export interface PessoaApplication {
  /**
   * Obter as pessoas
   * @name get
   * @public
   * @param {string} odataQuery - string de consulta odata
   * @param {any} paginateFilter - paginação
   * @returns {Promise<MongooseDocument[]>}
   */
  get(odataQuery: string, paginateFilter): Promise<AggregatePaginate<Pessoa>>

  /**
   * Obter pessoa por cpf
   * @name getByEmail
   * @public
   * @param {string} cpf - cpf da pessoa
   * @returns {Promise<Pessoa>}
   */
  getByCPF(cpf: string): Promise<Pessoa>

  /**
   * Obter pessoa por idPessoa
   * @name getById
   * @public
   * @param {string} idPessoa - id
   * @returns {Promise<Pessoa>}
   */
  getById(idPessoa: string): Promise<Pessoa>
}

@injectable()
export class PessoaApplicationImpl implements PessoaApplication {
  private readonly _pessoaRepository: PessoaRepository

  constructor(
    @inject(SERVICE_IDENTIFIER.PessoaRepository)
    pessoaRepository: PessoaRepository
  ) {
    this._pessoaRepository = pessoaRepository
  }

  get(odataQuery: string, paginateFilter): Promise<AggregatePaginate<Pessoa>> {
    return this._pessoaRepository.getPages(odataQuery, paginateFilter)
  }

  getById(id: string): Promise<Pessoa> {
    const odataQuery = `idPessoa eq '${id}'`
    return this._pessoaRepository.getOneByFilters(odataQuery)
  }

  getByCPF(cpf: string): Promise<Pessoa> {
    const odataQuery = `cpf eq '${cpf}'`
    return this._pessoaRepository.getOneByFilters(odataQuery)
  }
}
