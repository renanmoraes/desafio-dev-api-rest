import { Pessoa } from './../domain/pessoa/entity/pessoa'
import ApiResponse from '../../shared/models/api-response'

export type PessoaResponse = ApiResponse<Pessoa>
export type PessoasResponse = ApiResponse<Pessoa[]>
