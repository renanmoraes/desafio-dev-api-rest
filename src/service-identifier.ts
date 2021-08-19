const SERVICE_IDENTIFIER = {
  UserSignInRequestApplication: Symbol('UserSignInRequestApplicationImpl'),

  UserSignUpRequestApplication: Symbol('UserSignUpRequestApplicationImpl'),

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
