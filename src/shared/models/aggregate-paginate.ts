// import { Document } from 'mongoose'

export interface AggregatePaginate<T> {
  // aggregatePaginate(aggregateQuery, options, callback)

  docs: T[]

  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}
