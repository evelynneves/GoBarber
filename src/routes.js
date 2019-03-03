const express = require('express')

const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const userController = require('./app/controllers/userController')
const SessionController = require('./app/controllers/sessionController')
const dashboardController = require('./app/controllers/dashboardController')
const fileController = require('./app/controllers/fileController')

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/files/:file', fileController.show)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, userController.create)
routes.post('/signup', upload.single('avatar'), userController.store)

routes.use('/app', authMiddleware)

routes.get('/app/lagout', SessionController.destroy)

routes.get('/app/dashboard', dashboardController.index)

module.exports = routes
