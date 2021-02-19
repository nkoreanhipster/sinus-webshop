import auth from './auth.js'
import register from './register.js'
import order from './order.js'
import products from './products.js'
import { GET, POST } from './request.js'

export default { auth, register, order, products, etc() { return 123 } }
export { auth, register, order, products, GET, POST }