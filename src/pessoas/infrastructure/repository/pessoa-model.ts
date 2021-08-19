import { Model, Document } from 'mongoose'
import PessoaSchema from './pessoa-schema'
import MongoDbConnectionSingleton from '../../../shared/infrastructure/service/mongo/mongo-db-connection-service'
import MongooseModel from '../../../shared/infrastructure/model/mongoose-model'

const connection = MongoDbConnectionSingleton.getConnection()
const PessoaModel: Model<Document> = connection.model<Document>(
  'pessoa',
  PessoaSchema
)

export default PessoaModel as MongooseModel<Document>
