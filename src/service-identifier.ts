const SERVICE_IDENTIFIER = {
  UserSignInRequestApplication: Symbol('UserSignInRequestApplicationImpl'),

  UserSignUpRequestApplication: Symbol('UserSignUpRequestApplicationImpl'),

  PessoaRepository: Symbol('PessoaRepository'),

  PessoaApplication: Symbol('PessoaApplication'),

  UserRecoverPasswordRequetApplication: Symbol(
    'UserRecoverPasswordRequetApplicationImpl'
  ),

  UserApplication: Symbol('UserApplicationImpl'),

  UserAuthService: Symbol('UserAuthServiceImpl'),

  UserRepository: Symbol('UserRepositoryImpl'),

  PaymentRequestApplication: Symbol('PaymentRequestApplicationImpl'),

  PaymentService: Symbol('PaymentServiceImpl'),

  MongoDbConnectionService: Symbol('MongoDbConnectionSingleton')
}

export default SERVICE_IDENTIFIER
