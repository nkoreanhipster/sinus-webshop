const {Router} = require('express')
const Auth = require('../middleware/auth')
const UserController = require('../controllers/userController')

const router = new Router()

router.get('/', Auth.admin, UserController.getUsers )

module.exports = router