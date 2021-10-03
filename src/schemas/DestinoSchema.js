const COMMON = require('./_common')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DestinoSchema = new Schema(Object.assign({}, COMMON, {
  contacto: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  nombre: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    default: null
  },
  valor: {
    type: Number,
    default: 0
  },
  lugar: {
    type: String,
    trim: true,
    required: true
  },
  comentarios: [{
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    mensaje: {
      type: String,
      trim: true,
      required: true
    },
    calificacion: {
      type: Number,
      default: 0
    }
  }]
}), {
  collection: 'destinos',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

module.exports = mongoose.model('Destino', DestinoSchema)
