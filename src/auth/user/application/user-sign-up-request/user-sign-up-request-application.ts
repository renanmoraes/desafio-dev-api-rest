import { inject, injectable } from 'inversify'
import { UserSignUpRequest } from '../../infrastructure/user-sign-up-request/value/user-sign-up-request'
import { User } from '../../../../user/domain/user/entity/user'
import { UserAuthService } from '../../../../shared/infrastructure/service/user-auth/user-auth.service'
import { UserRepository } from '../../../../user/infrastructure/repository/user-repository'
import SERVICE_IDENTIFIER from '../../../../service-identifier'

export interface UserSignUpRequestApplication {
  signUp(userSignUpRequest: UserSignUpRequest): Promise<boolean>
}

@injectable()
export class UserSignUpRequestApplicationImpl
  implements UserSignUpRequestApplication
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

  async signUp(userSignUpRequest: UserSignUpRequest): Promise<boolean> {
    const isSignUped = await this._userAuthService.signUp(userSignUpRequest)

    if (isSignUped) {
      const user = {
        ...userSignUpRequest
      } as unknown as User

      delete user.password
      const isCreateUser = this._userRepository.createMany([user])

      await this._userAuthService.sendActivationEmail(userSignUpRequest.email)

      return isCreateUser
    }

    return false
  }
}
