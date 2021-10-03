const express = require('express')

const Router = express.Router()

/** Utilitarios */
Router.use('/destinos', require('./routes/destinos'))
Router.use('/experiencias', require('./routes/experiencias'))
Router.use('/usuarios', require('./routes/usuarios'))

module.exports = Router
