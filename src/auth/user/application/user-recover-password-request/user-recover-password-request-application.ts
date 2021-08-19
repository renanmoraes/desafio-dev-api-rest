import { inject, injectable } from 'inversify'
import SERVICE_IDENTIFIER from '../../../../service-identifier'
import { UserAuthService } from '../../../../shared/infrastructure/service/user-auth/user-auth.service'
import { UserRecoverPasswordRequest } from '../../infrastructure/user-recover-password-request/value/user-recover-password-request'

export interface UserRecoverPasswordRequetApplication {
  sendRecoveryPasswordEmail(
    userRecoverPasswordRequest: UserRecoverPasswordRequest
  ): Promise<boolean>
}

@injectable()
export class UserRecoverPasswordRequetApplicationImpl
  implements UserRecoverPasswordRequetApplication
{
  private readonly _userAuthService: UserAuthService

  constructor(
    @inject(SERVICE_IDENTIFIER.UserAuthService)
    userAuthService: UserAuthService
  ) {
    this._userAuthService = userAuthService
  }

  async sendRecoveryPasswordEmail(
    userRecoverPasswordRequest: UserRecoverPasswordRequest
  ): Promise<boolean> {
    try {
      await this._userAuthService.sendPasswordResetEmail(
        userRecoverPasswordRequest.email
      )
      return true
    } catch (err) {
      return false
    }
  }
}
