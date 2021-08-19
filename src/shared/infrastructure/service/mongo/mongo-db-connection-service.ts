import { Connection, Mongoose } from 'mongoose'
import config from '../../../cross/config'
import logger from '../../../cross/logger'

class MongoDbConnectionSingleton {
  private static readonly _dbName: string = config.DATABASE_NAME
  private static readonly _mongooseInstance = new Mongoose()

  /**
   * Fabricar nova script de conexão com o banco
   * @name factoryMongoDbUrl
   * @public
   * @returns {string} url de conexão
   */

  public static factoryMongoDbUrl(): string {
    const { MONGO_DB_PORT } = config

    let url
    if (config.MONGO_DB_REPLICA_SET) {
      url =
        `mongodb://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@` +
        `${config.MONGO_DB_SERVERS}/${this._dbName}` +
        `?authSource=admin&retryWrites=true&w=majority&ssl=${config.MONGO_DB_SSL}&replicaSet=${config.MONGO_DB_REPLICA_SET}`
    } else if (MONGO_DB_PORT > 0) {
      if (config.MONGO_DB_USER && config.MONGO_DB_PASS) {
        url =
          `mongodb://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@` +
          `${config.MONGO_DB_HOST}:${config.MONGO_DB_PORT}/${this._dbName}` +
          `?authSource=admin&retryWrites=true&w=majority&ssl=${config.MONGO_DB_SSL}`
      } else {
        url =
          `mongodb://` +
          `${config.MONGO_DB_HOST}:${config.MONGO_DB_PORT}/${this._dbName}` +
          `?authSource=admin&retryWrites=true&w=majority&ssl=${config.MONGO_DB_SSL}`
      }
    } else {
      url =
        `mongodb+srv://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@` +
        `${config.MONGO_DB_HOST}/${this._dbName}` +
        `?authSource=admin&retryWrites=true&w=majority&ssl=${config.MONGO_DB_SSL}`
    }

    return url
  }

  /**
   * Obter uma nova conexão com a base de dados
   * @name getDb
   * @public
   * @param {string} customUrl - URL de conexão com o mongo customizada
   * @returns {Promise<any>} conexão
   */
  public static async connect(customUrl?: string): Promise<void> {
    const url = customUrl || this.factoryMongoDbUrl()
    logger.info(`${this.connect.name} url`, url)

    try {
      await this._mongooseInstance.connect(url, {
        reconnectTries: 1000,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
    } catch (error) {
      logger.error(`${this.connect.name} url`, error)
    }
  }

  /**
   * Obter uma conexão com a base de dados
   * @name getConnection
   * @public
   * @returns {Connection} conexão
   */
  public static getConnection(): Connection {
    return this._mongooseInstance.connection.useDb(this._dbName)
  }

  /**
   * Desconectar ao banco de dados
   * @name disconnect
   * @public
   * @returns {Promise<void>}
   */
  public static disconnect(): Promise<void> {
    return this._mongooseInstance.disconnect()
  }
}

export default MongoDbConnectionSingleton
