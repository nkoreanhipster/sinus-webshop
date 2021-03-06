import { POST, GET, DELETE, PATCH } from './request';
/**
 * Getta en lista med alla products
 */
let getProducts = async () => {
    let response = await GET('products')
    let json = await response.json()
    return json
}

/**
 * Få en(1) produkt
 * @param {Number} id 
 */
let getProduct = async (id) => {
    let response = await GET(`products/${id}`)
    let json = await response.json()
    return json
}

/**
 * Få produkter som är inkluderade i angivet orderId
 * @param {Number} orderId 
 */
let getProductsByOrderId = async (orderId, token) => {
    let response = await GET(`products/order/${orderId}`, token)
    let json = await response.json()
    return json
}

/**
 * Skapa ny produkt
 * @param {Object} product 
 */
let newProduct = async (product, token) => {
    let response = await POST('products', product, token)
    let json = await response.json()
    return json
}

/**
 * Update existing product in db
 * @param {Object} product 
 */
let patchProduct = async (payload, token) => {
    let { _id } = payload
    let response = await PATCH(`products/${_id}`, payload, token)
    let json = await response.json()
    return json
}


/**
 * Remove existing product from db
 * @param {Number} id
 */
let deleteProduct = async (id, token) => {
    let response = await DELETE(`products/${id}`, token)
    let json = await response.json()
    return json
}

export default { getProducts, getProduct,getProductsByOrderId, deleteProduct, newProduct, patchProduct }
export { getProducts, getProduct, getProductsByOrderId, deleteProduct, newProduct, patchProduct }