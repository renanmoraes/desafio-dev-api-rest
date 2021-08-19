import { Schema } from 'mongoose'
import * as uuid from 'uuid-random'
import mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: false,
      unique: true,
      default: () => uuid(),
      index: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    profileImage: {
      type: String,
      required: false,
      unique: false,
      index: false
    },

    ratings: {
      type: Array,
      required: false,
      unique: false,
      index: false
    },

    currentLocation: {
      type: Object,
      required: false,
      unique: false,
      index: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

UserSchema.plugin(mongooseAggregatePaginate)

export default UserSchema
