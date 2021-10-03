const COMMON = require('./_common')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExperienciaSchema = new Schema(Object.assign({}, COMMON, {
  destino: {
    type: Schema.Types.ObjectId,
    ref: 'Destino'
  },
  invitados: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
  valor: {
    type: Number,
    default: 0
  }
}), {
  collection: 'experiencias',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

module.exports = mongoose.model('Experiencia', ExperienciaSchema)
