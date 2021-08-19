import { Model, Document } from 'mongoose'
import MongooseModel from '../../../shared/infrastructure/model/mongoose-model'
import MongoDbConnectionSingleton from '../../../shared/infrastructure/service/mongo/mongo-db-connection-service'
import UserSchema from './user-schema'

const connection = MongoDbConnectionSingleton.getConnection()
const UserModel: Model<Document> = connection.model<Document>(
  'user',
  UserSchema
)

export default UserModel as MongooseModel<Document>
