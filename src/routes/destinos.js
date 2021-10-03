const CrudFactory = require('../factory/crud')
const RouteFactory = require('../factory/routes')
const DestinoService = require('../services/DestinoService')

const Entity = new CrudFactory('Destinos', DestinoService)

const endpoints = Entity.getEndpoints()
const Router = new RouteFactory('Destinos', endpoints)

module.exports = Router
