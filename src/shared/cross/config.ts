const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  MONGO_DB_USER: process.env.MONGO_DB_USER,
  MONGO_DB_PASS: process.env.MONGO_DB_PASS,
  MONGO_DB_HOST: process.env.MONGO_DB_HOST,
  MONGO_DB_PORT: Number(process.env.MONGO_DB_PORT),
  MONGO_DB_REPLICA_SET: process.env.MONGO_DB_REPLICA_SET,
  MONGO_DB_SERVERS: process.env.MONGO_DB_SERVERS,
  MONGO_DB_SSL: process.env.MONGO_DB_SSL,

  DATABASE_NAME: process.env.DATABASE_NAME,

  jwt: {
    secret: process.env.JWT_SECRET
  },

  checkout: {
    pagSeguro: {
      baseUrl: process.env.CHECKOUT_PAGSEGURO_BASE_URL,
      email: process.env.CHECKOUT_PAGSEGURO_EMAIL,
      token: process.env.CHECKOUT_PAGSEGURO_TOKEN
    },
    payPal: {
      baseUrl: process.env.CHECKOUT_PAYPAL_BASE_URL,
      email: process.env.CHECKOUT_PAYPAL_EMAIL,
      token: process.env.CHECKOUT_PAYPAL_TOKEN
    }
  }
}

export default config
