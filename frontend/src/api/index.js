// /api/auth/ 	POST 	Authentiserar user med email & password. Returnerar en JWT-token som används vid varje anrop API:et i en Authorization-header.
// /api/register/ 	POST 	Registrerar en user enligt User-modellen.

// /api/products/ 	GET 	Returnerar en lista på samtliga produkter.
// /api/products/:id 	GET 	Returnerar en enstaka produkt.
// /api/products/ 	POST 	Skapar en ny produkt, se produkt-modell. Enbart tillgänglig för admins
// /api/products/:id 	PATCH 	Uppdaterar produkt, se produkt-modell. Enbart tillgänglig för admins
// /api/products/:id 	DELETE 	Tar bort en produkt med :id. Enbart tillgänglig för admins
// /api/orders 	GET 	Returnerar en lista på samtliga ordrar för admins, och ägda orders för inloggad användare.
// /api/orders 	POST 	Skapar en ny order, se order-modell.

import auth from './auth.js'
import register from './register.js'
import order from './order.js'
import products from './products.js'
import { GET, POST } from './request.js'

export default { auth, register, order, products, etc() { return 123 } }
export { auth, register, order, products, GET, POST }


// in index.js
// import api
// api.auth.tryAndLogin() api.register.