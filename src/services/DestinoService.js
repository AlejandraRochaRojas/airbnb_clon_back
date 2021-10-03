const BaseService = require('./BaseService')
const Destino = require('../schemas/DestinoSchema')

class DestinoService extends BaseService {}

module.exports = new DestinoService(Destino, {}, [
  {
    path: 'contacto',
    select: 'nombre apellido correo rol'
  },
  {
    path: 'comentarios.usuario',
    select: 'nombre apellido correo rol'
  }
])
