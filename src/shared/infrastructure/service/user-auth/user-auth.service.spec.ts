import config from '../../../cross/config'
import userSignUpRequestDouble from '../../../../auth/user/infrastructure/user-sign-up-request/double/user-sign-up-request.double'
import userSignInRequestDouble from '../../../../auth/user/infrastructure/user-sign-in-request/double/user-sign-in-request.double'
import { UserAuthServiceImpl } from './user-auth.service'

const userAuthService = new UserAuthServiceImpl()

describe('Serviço de autentificação do Usuários', () => {
  it('Deve cadastrar de uma nova credencial de autentificação e retorna o uid', async () => {
    const doubleUserSignUpRequest = userSignUpRequestDouble[0]

    const doubleCreateUserResponse = {
      user: {
        refreshToken:
          'AE0u-Nd96lF8jaJJg2G1kodiSLEGOwxrtJzOY6Alt5pyukxM8dni_DpII4VVVGOkeupKA8XqIg8nRW2XLJiVf1oTpLy9TVzr6E_0ieu9kTNtyzifLuLrZJQ3UBysl05-245zyww948sHjdyc8JGElgQcz-IjO9d0w6Q3e4r3XMIso5i1sjZHYoxyW4LjOEqXnKhsGguLOTKt',
        uid: 'HrHtCASIUMRAeOtX8ZehqXHYH8I3',
        displayName: null,
        photoURL: null,
        email: doubleUserSignUpRequest.email,
        emailVerified: false,
        phoneNumber: null,
        isAnonymous: false,
        tenantId: null
      },
      credential: null,
      operationType: 'signIn'
    }

    // firebaseTatooStudioApp.auth().createUserWithEmailAndPassword = jest
    //   .fn()
    //   .mockReturnValue(Promise.resolve(doubleCreateUserResponse))

    const value = await userAuthService.signUp(doubleUserSignUpRequest)

    // expect(
    //   firebaseTatooStudioApp.auth().createUserWithEmailAndPassword
    // ).toHaveBeenCalledTimes(1)

    // expect(
    //   firebaseTatooStudioApp.auth().createUserWithEmailAndPassword
    // ).toHaveBeenCalledWith(
    //   doubleUserSignUpRequest.email,
    //   doubleUserSignUpRequest.password
    // )

    expect(value).toBe(true)
  })

  it('Deve enviar email de ativação', async () => {
    const doubleUserSignUpRequest = userSignUpRequestDouble[0]

    const doubleEmail = doubleUserSignUpRequest.email

    // firebaseTatooStudioApp.auth().sendSignInLinkToEmail = jest
    //   .fn()
    //   .mockReturnValue(Promise.resolve(undefined))

    const value = await userAuthService.sendActivationEmail(doubleEmail)

    // expect(
    //   firebaseTatooStudioApp.auth().sendSignInLinkToEmail
    // ).toHaveBeenCalledTimes(1)
    // expect(
    //   firebaseTatooStudioApp.auth().sendSignInLinkToEmail
    // ).toHaveBeenCalledWith(doubleEmail, doubleActionCodeSettings)

    expect(value).toBe(true)
  })

  it('Deve validar credenciais de autentificação', async () => {
    const doubleUserSignInRequest = userSignInRequestDouble[0]

    const doubleSignedInResponse = {
      user: {
        uid: 'QJJ9ELwoWgNNjw9iCS7ddrWziAq2',
        displayName: null,
        photoURL: null,
        email: doubleUserSignInRequest.email,
        emailVerified: false,
        phoneNumber: null,
        isAnonymous: false,
        tenantId: null,
        providerData: [
          {
            uid: doubleUserSignInRequest.email,
            displayName: null,
            photoURL: null,
            email: doubleUserSignInRequest.email,
            phoneNumber: null,
            providerId: 'password'
          }
        ],
        apiKey: 'AIzaSyATWrr4yFvQnDzHKN4oL33adO7mSWhJxPQ',
        appName: '[DEFAULT]',
        authDomain: null,
        stsTokenManager: {
          apiKey: 'AIzaSyATWrr4yFvQnDzHKN4oL33adO7mSWhJxPQ',
          refreshToken:
            'AE0u-NfAdj-Xl6c-8bgZGbj2p8Wlf3jOjb-TkKtLeNU7acZMNlwiGtwUTNMUE4hS8-cf8ywFHBOFQimHWu7Gff2fk-RwTvwUI1M4quK0pAM1UXcQpMIJDktMQ-Uszmy5c2xB4u1QZFXjy1sdWcsgf5nnSuIupRPNlXDIZfWhxyOuJffpObdrjCHjl7RNyCBWxA84g6MzGuyN',
          accessToken:
            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUxMDM2YWYyZDgzOWE4NDJhZjQzY2VjZmJiZDU4YWYxYTc1OGVlYTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmlzY2EtMjgzNjAzIiwiYXVkIjoicmlzY2EtMjgzNjAzIiwiYXV0aF90aW1lIjoxNTk4ODE1MDMxLCJ1c2VyX2lkIjoiUUpKOUVMd29XZ05Oanc5aUNTN2Rkcld6aUFxMiIsInN1YiI6IlFKSjlFTHdvV2dOTmp3OWlDUzdkZHJXemlBcTIiLCJpYXQiOjE1OTg4MTUwMzEsImV4cCI6MTU5ODgxODYzMSwiZW1haWwiOiJlbWFpbC1hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlbWFpbC1hQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TFN_oUHbSpDtqjinDZ-mwQ2X7it5lIZLuuDR5mUj_1sZQswxzN5aqvHFDdqA6tJsd9a_cT14Vlfr4APmKK0ZedY5KCqFTY3QMKqzIZBgGmmAs2hc72GW9D4wgyEUAO52POKHX5rxa1vcSVHZ38VW24wEMhHjfz13qdoIlUNydv9iIuPNaFqMf38vRZBBcE8o2cLFVgnF9esnirmjyJdvtRzDfFVk4uDdswTtbzZkK2OpQm4Nkq42bn-HEsoVL8J20eqsUCzbta-H5yBzp7GlojeO3mT_rO7tb6wcnAYgoZ25XDtN3AQFWIxsKjrPVDDZrAdPcVyYpcsQAQL9HwzDFA',
          expirationTime: 1598818631000
        },
        redirectEventId: null,
        lastLoginAt: '1598815003016',
        createdAt: '1598814672513',
        multiFactor: { enrolledFactors: [] }
      },
      credential: null,
      additionalUserInfo: { providerId: 'password', isNewUser: false },
      operationType: 'signIn'
    }

    // firebaseTatooStudioApp.auth().signInWithEmailAndPassword = jest
      // .fn()
      // .mockReturnValue(Promise.resolve(doubleSignedInResponse))

    const value = await userAuthService.signIn(doubleUserSignInRequest)

    // expect(
    //   firebaseTatooStudioApp.auth().signInWithEmailAndPassword
    // ).toHaveBeenCalledTimes(1)

    // expect(
    //   firebaseTatooStudioApp.auth().signInWithEmailAndPassword
    // ).toHaveBeenCalledWith(
    //   doubleUserSignInRequest.email,
    //   doubleUserSignInRequest.password
    // )

    expect(value).toBe(true)
  })

  it('Deve remover credenciais', async () => {
    const doubleUserSignUpRequest = userSignUpRequestDouble[0]

    const doubleEmail = doubleUserSignUpRequest.email

    const doubleUserRecord = {
      uid: 'QJJ9ELwoWgNNjw9iCS7ddrWziAq2',
      email: 'teste1@gmail.com',
      emailVerified: false,
      displayName: undefined,
      photoURL: undefined,
      phoneNumber: undefined,
      disabled: false,
      passwordHash: undefined,
      passwordSalt: undefined,
      tokensValidAfterTime: 'Sun, 30 Aug 2020 19:11:12 GMT',
      tenantId: undefined
    }

    // firebaseTatooStudioAdmin.auth().getUserByEmail = jest
    //   .fn()
    //   .mockReturnValue(Promise.resolve(doubleUserRecord))

    // firebaseTatooStudioAdmin.auth().deleteUser = jest
    //   .fn()
    //   .mockReturnValue(Promise.resolve(doubleUserRecord))

    const value = await userAuthService.deleteAuth(doubleEmail)

    // expect(
    //   firebaseTatooStudioAdmin.auth().getUserByEmail
    // ).toHaveBeenCalledTimes(1)
    // expect(firebaseTatooStudioAdmin.auth().getUserByEmail).toHaveBeenCalledWith(
    //   doubleEmail
    // )

    // expect(firebaseTatooStudioAdmin.auth().deleteUser).toHaveBeenCalledTimes(1)
    // expect(firebaseTatooStudioAdmin.auth().deleteUser).toHaveBeenCalledWith(
    //   doubleUserRecord.uid
    // )

    expect(value).toBe(true)
  })

  it('Deve enviar email de recuperação de senha', async () => {
    const doubleUserSignInRequest = userSignInRequestDouble[0]
    const doubleEmail = doubleUserSignInRequest.email

    // firebaseTatooStudioApp.auth().sendPasswordResetEmail = jest
    //   .fn()
    //   .mockReturnValue(Promise.resolve(undefined))

    const value = await userAuthService.sendPasswordResetEmail(doubleEmail)

    // expect(
    //   firebaseTatooStudioApp.auth().sendPasswordResetEmail
    // ).toHaveBeenCalledTimes(1)
    // expect(
    //   firebaseTatooStudioApp.auth().sendPasswordResetEmail
    // ).toHaveBeenCalledWith(doubleEmail)

    expect(value).toBe(true)
  })
})
