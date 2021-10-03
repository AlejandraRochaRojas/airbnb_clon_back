const express = require('express')
const querymen = require('querymen')

module.exports = class EntityRouterFactory {
  constructor (path = '', endpoints = {}) {
    this.endpoints = endpoints
    this.path = path
    this.router = express.Router()

    return this.getCrudRoutes()
  }

  getCrudRoutes () {
    this.router.get('/', [
      querymen.middleware({})
    ], this.endpoints.getAll)

    this.router.post('/', this.endpoints.create)
    // this.router.post('/_many', this.endpoints.createMany)

    this.router.get('/:key', [
      querymen.middleware({})
    ], this.endpoints.detail)

    this.router.post('/:key', this.endpoints.update)
    this.router.put('/:key', this.endpoints.update)
    this.router.delete('/:key', this.endpoints.delete)

    return this.router
  }
}
