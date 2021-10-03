const BaseService = require('./BaseService')
const Experiencia = require('../schemas/ExperienciaSchema')

class ExperienciaService extends BaseService {}

module.exports = new ExperienciaService(Experiencia)
