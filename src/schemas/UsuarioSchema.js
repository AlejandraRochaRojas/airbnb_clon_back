const COMMON = require('./_common')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UsuarioSchema = new Schema(Object.assign({}, COMMON, {
  destinos: [],
  experiencias: [],
  correo: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  nombre: {
    type: String,
    trim: true,
    required: true
  },
  apellido: {
    type: String,
    trim: true,
    required: true
  },
  rol: {
    type: String,
    enum: ['USER', 'HOST'],
    default: 'USER'
  }
}), {
  collection: 'usuarios',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

/* Metodos */
UsuarioSchema.methods.hashPassword = (texto) => {
  return bcrypt.hashSync(texto, bcrypt.genSaltSync(11))
}

UsuarioSchema.methods.compareHash = (pass, hash) => {
  return bcrypt.compareSync(pass, hash)
}

UsuarioSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(11))
  next()
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
