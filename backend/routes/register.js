const {Router} = require('express')
const AuthController = require('../controllers/authController')

const router = new Router()

router.post('/', AuthController.register)

module.exports = router