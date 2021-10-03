const CrudFactory = require('../factory/crud')
const RouteFactory = require('../factory/routes')
const ExperienciaService = require('../services/ExperienciaService')

const Entity = new CrudFactory('Experiencias', ExperienciaService)

const endpoints = Entity.getEndpoints()
const Router = new RouteFactory('Experiencias', endpoints)

module.exports = Router
