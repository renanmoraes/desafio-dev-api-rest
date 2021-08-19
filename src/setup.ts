import 'reflect-metadata'
import { Container } from 'inversify'
import SERVICE_IDENTIFIER from './service-identifier'
import {
  UserSignUpRequestApplication,
  UserSignUpRequestApplicationImpl
} from './auth/user/application/user-sign-up-request/user-sign-up-request-application'
import {
  UserRecoverPasswordRequetApplication,
  UserRecoverPasswordRequetApplicationImpl
} from './auth/user/application/user-recover-password-request/user-recover-password-request-application'
import {
  UserApplication,
  UserApplicationImpl
} from './user/application/user-application'
import {
  UserAuthService,
  UserAuthServiceImpl
} from './shared/infrastructure/service/user-auth/user-auth.service'
import {
  UserRepository,
  UserRepositoryImpl
} from './user/infrastructure/repository/user-repository'
import {
  UserSignInRequestApplication,
  UserSignInRequestApplicationImpl
} from './auth/user/application/user-sign-in-request/user-sign-in-request-application'

const container = new Container()

container
  .bind<UserSignInRequestApplication>(
    SERVICE_IDENTIFIER.UserSignInRequestApplication
  )
  .to(UserSignInRequestApplicationImpl)
  .inTransientScope()

container
  .bind<UserSignUpRequestApplication>(
    SERVICE_IDENTIFIER.UserSignUpRequestApplication
  )
  .to(UserSignUpRequestApplicationImpl)
  .inTransientScope()

container
  .bind<UserRecoverPasswordRequetApplication>(
    SERVICE_IDENTIFIER.UserRecoverPasswordRequetApplication
  )
  .to(UserRecoverPasswordRequetApplicationImpl)
  .inTransientScope()

container
  .bind<UserApplication>(SERVICE_IDENTIFIER.UserApplication)
  .to(UserApplicationImpl)

container
  .bind<UserAuthService>(SERVICE_IDENTIFIER.UserAuthService)
  .to(UserAuthServiceImpl)
  .inTransientScope()

container
  .bind<UserRepository>(SERVICE_IDENTIFIER.UserRepository)
  .to(UserRepositoryImpl)
  .inTransientScope()

export default container
