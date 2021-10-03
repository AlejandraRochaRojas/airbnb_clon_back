const BaseService = require('./BaseService')
const Usuario = require('../schemas/UsuarioSchema')

class UsuarioService extends BaseService {}

module.exports = new UsuarioService(Usuario, {
  password: 0
})
