const CrudFactory = require('../factory/crud')
const RouteFactory = require('../factory/routes')
const UsuarioService = require('../services/UsuarioService')

const Entity = new CrudFactory('Usuarios', UsuarioService)

const endpoints = Entity.getEndpoints()
const Router = new RouteFactory('Usuarios', endpoints)

module.exports = Router
