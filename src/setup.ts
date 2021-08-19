import 'reflect-metadata'
import { Container } from 'inversify'
import SERVICE_IDENTIFIER from './service-identifier'
import {
  PessoaRepository,
  PessoaRepositoryImpl
} from './pessoas/infrastructure/repository/pessoa-repository'
import {
  PessoaApplication,
  PessoaApplicationImpl
} from './pessoas/application/pessoa-application'

const container = new Container()

container
  .bind<PessoaApplication>(SERVICE_IDENTIFIER.PessoaApplication)
  .to(PessoaApplicationImpl)

container
  .bind<PessoaRepository>(SERVICE_IDENTIFIER.PessoaRepository)
  .to(PessoaRepositoryImpl)
  .inTransientScope()

export default container
