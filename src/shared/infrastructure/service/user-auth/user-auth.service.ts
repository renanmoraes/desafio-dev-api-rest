import { injectable } from 'inversify'
import { UserSignUpRequest } from '../../../../auth/user/infrastructure/user-sign-up-request/value/user-sign-up-request'
import { UserSignInRequest } from '../../../../auth/user/infrastructure/user-sign-in-request/value/user-sign-in-request'

export interface UserAuthService {
  /**
   * Enviar email de ativação
   * @name sendActivationEmail
   * @public
   * @param {string} email - email para envio da ativação
   * @returns {Promise<boolean>}
   */
  sendActivationEmail(email: string): Promise<boolean>

  /**
   * Cadastro de uma nova credencial de autentificação e retorna o uid
   * @name signUp
   * @public
   * @param {UserSignUpRequest} userSignUpRequest - requisição de cadastro
   * @returns {Promise<boolean>}
   */
  signUp(userSignUpRequest: UserSignUpRequest): Promise<boolean>

  /**
   * Validar credenciais de autentificação
   * @name signIn
   * @public
   * @param {UserSignInRequest} userSignInRequest - requisição de login
   * @returns {Promise<boolean>}
   */
  signIn(userSignInRequest: UserSignInRequest): Promise<boolean>

  /**
   * Remover credenciais
   * @name deleteAuth
   * @public
   * @param {string} email - email do usuário
   * @returns {Promise<boolean>}
   */
  deleteAuth(email: string): Promise<boolean>

  /**
   * Enviar email de recuperação de senha
   * @name sendPasswordResetEmail
   * @public
   * @param {string} email - email do usuário
   * @returns {Promise<boolean>}
   */
  sendPasswordResetEmail(email: string): Promise<boolean>
}

@injectable()
export class UserAuthServiceImpl implements UserAuthService {
  deleteAuth(email: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async sendActivationEmail(email: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async signUp(userSignUpRequest: UserSignUpRequest): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async signIn(userSignInRequest: UserSignInRequest): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async sendPasswordResetEmail(email: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
