import { Schema } from 'mongoose'
import * as uuid from 'uuid-random'
import mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const PessoaSchema: Schema = new Schema(
  {
    idPessoa: {
      type: String,
      required: false,
      unique: true,
      default: () => uuid(),
      index: true
    },

    nome: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    cpf: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    dataNascimento: {
      type: Date,
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

PessoaSchema.plugin(mongooseAggregatePaginate)

export default PessoaSchema
