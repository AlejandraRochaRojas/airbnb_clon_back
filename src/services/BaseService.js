const moment = require('moment')

module.exports = class BaseService {
  constructor (schema, excludes = {}, populates = []) {
    this.schema = schema
    this.excludes = excludes
    this.popluate = populates
  }

  /**
   * Create Many
   * @param {array} data
   */
  async createMany (data = []) {
    const elements = data.map(el => {
      return new this.schema({
        ...el,
        _created_at: moment()
      })
    })

    await this.schema.create(elements)

    return {
      ok: `Created ${elements.length} elements`
    }
  }

  /**
   * Create One
   * @param {array} data
   */
  async create (data = {}) {
    const element = new this.schema({
      ...data,
      _created_at: moment()
    })

    return element.save()
  }

  /**
   * GetAll
   * @param {object} query
   * @param {object} cursor
   * @param {object} select
   */
  async getAll (query = {}, cursor = {}, select = {}) {
    const mongoQuery = {...query, ...{ _deleted: false }}

    const mergeSelected = {
      ...select,
      ...this.excludes
    }

    const result = await this.schema.find(mongoQuery, mergeSelected, cursor)
      .populate(this.popluate)
    const count = await this.schema.count(mongoQuery)

    return {
      result,
      count
    }
  }

  /**
   * Detail
   * @param {object} key
   * @param {object} select
   */
  async detail (key = {}, select = {}) {
    const mongoQuery = {
      ...key,
      ...{ _deleted: false }
    }

    const mergeSelected = {
      ...select,
      ...this.excludes
    }

    return this.schema.findOne(mongoQuery, mergeSelected)
    .populate(this.popluate)
  }

  /**
   * Update
   * @param {object} key
   * @param {object} data
   */
  async update (key = {}, data = {}) {
    const mongoQuery = {
      ...key,
      ...{ _deleted: false }
    }

    const element = await this.schema.findOne(mongoQuery)

    if (element) {
      const update = Object.assign(element, data, {
        id: element.id,
        _created_at: element._created_at,
        _updated_at: moment()
      })

      await update.save()

      return {
        ok: 'ok'
      }
    } else {
      return null
    }
  }

  /**
   * Delete
   * @param {object} key
   */
  async delete (key = {}) {
    const mongoQuery = {
      ...key,
      ...{ _deleted: false }
    }

    const element = await this.schema.findOne(mongoQuery)

    if (element) {
      const now = moment()
      const softDelete = Object.assign(element, {
        _updated_at: now,
        _deleted_at: now,
        _deleted: true
      })

      await softDelete.save()
      return {
        ok: 'element is deleted successfully'
      }
    } else {
      return null
    }
  }
}
