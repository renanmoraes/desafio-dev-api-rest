import { inject, injectable } from 'inversify'
import SERVICE_IDENTIFIER from '../../../../service-identifier'
import { UserAuthService } from '../../../../shared/infrastructure/service/user-auth/user-auth.service'
import { User } from '../../../../user/domain/user/entity/user'
import { UserRepository } from '../../../../user/infrastructure/repository/user-repository'
import { UserSignInRequest } from '../../infrastructure/user-sign-in-request/value/user-sign-in-request'

export interface UserSignInRequestApplication {
  signIn(userSignInRequest: UserSignInRequest): Promise<User>
}

@injectable()
export class UserSignInRequestApplicationImpl
  implements UserSignInRequestApplication
{
  private readonly _userAuthService: UserAuthService
  private readonly _userRepository: UserRepository

  constructor(
    @inject(SERVICE_IDENTIFIER.UserAuthService)
    userAuthService: UserAuthService,
    @inject(SERVICE_IDENTIFIER.UserRepository)
    userRepository: UserRepository
  ) {
    this._userAuthService = userAuthService
    this._userRepository = userRepository
  }

  async signIn(userSignInRequest: UserSignInRequest): Promise<User> {
    const isSignIned = await this._userAuthService.signIn(userSignInRequest)

    if (isSignIned) {
      const user = {
        ...userSignInRequest
      } as User

      const odataQuery = `email eq '${user.email}'`

      const existingUser = await this._userRepository.getOneByFilters(
        odataQuery
      )
      if (!existingUser) {
        throw Error('Credenciais de acesso inválidas.')
      }

      return existingUser
    }

    throw Error('Credenciais de acesso inválidas.')
  }
}
