const AuthController = require('../controllers/authController')
const {Router} = require('express')

const router = new Router()

router.post('/', AuthController.authenticate)

module.exports = router