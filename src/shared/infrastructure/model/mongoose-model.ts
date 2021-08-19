import { Model, Document, Aggregate } from 'mongoose'
import PaginateFilter from '../../models/paginate-filter'

interface MongooseModel<T extends Document> extends Model<T> {
  aggregatePaginate(
    aggregate: Aggregate<T[]>,
    paginateFilter: PaginateFilter
  ): Promise<any>
}

export default MongooseModel
