module.exports = class CrudFactory {
  constructor (path, service) {
    this.path = path
    this.service = service
  }

  getEndpoints () {
    const service = this.service
    const path = this.path

    return {
      /**
       * GetAll
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async getAll(req, res, next) {
        try {
          const { query, cursor, select } = req.querymen
          const data = await service.getAll(query, cursor, select)

          res.status(200).json({
            payload: data.result,
            total: data.count
          })
        } catch (error) {
          next({
            err: error,
            code: 'SERVER_ERROR',
            status: 500
          })
        }
      },

      /**
       * Create
       * @param {*} req
       * @param {*} res
       * @param {*} next
       *
       * @method GET
       */
      async create (req, res, next) {
        try {
          const { body } = req
          const saved = await service.create(body)
          const { password, ...payload } = saved.toObject()

          res.status(201).json({
            payload
          })
        } catch (error) {
          if (error.code === 11000) {
            next({
              err: error,
              code: 'DUPLICATED_KEY',
              status: 401
            })
          } else {
            next({
              err: error,
              code: 'SERVER_ERROR',
              status: 500
            })
          }
        }
      },

      /**
       * Create Many
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async createMany (req, res, next) {
        try {
          const { body } = req
          const result = await service.createMany(body[path])
          res.status(201).json({
            message: result.ok
          })
        } catch (error) {
          if (error.code === 11000) {
            next({
              err: error,
              code: 'DUPLICATED_KEY',
              status: 401
            })
          } else {
            next({
              err: error,
              code: 'SERVER_ERROR',
              status: 500
            })
          }
        }
      },

      /**
       * Detail
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async detail (req, res, next) {
        try {
          const { params, querymen } = req
          const payload = await service.detail({
            _id: params.key
          }, querymen.select)

          if (payload) {
            res.status(200).json({
              payload: payload
            })
          } else {
            next({
              code: 'NOT_FOUND',
              status: 404
            })
          }
        } catch (error) {
          next({
            err: error,
            code: 'SERVER_ERROR',
            status: 500
          })
        }
      },

      /**
       * Update
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async update (req, res, next) {
        try {
          const { body, params } = req
          let payload = await service.update({
            _id: params.key
          }, body)
          if (payload) {
            res.status(201).json({
              payload: payload.ok
            })
          } else {
            next({
              code: 'NOT_FOUND',
              status: 404
            })
          }
        } catch (error) {
          next({
            err: error,
            code: 'SERVER_ERROR',
            status: 500
          })
        }
      },

      /**
       * Delete
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
      async delete (req, res, next) {
        try {
          const { params } = req
          let payload = await service.delete({ _id: params.key })
          if (payload) {
            res.status(201).json({
              payload: payload.ok
            })
          } else {
            next({
              code: 'NOT_FOUND',
              status: 404
            })
          }
        } catch (error) {
          next({
            err: error,
            code: 'SERVER_ERROR',
            status: 500
          })
        }
      }
    }
  }
}
