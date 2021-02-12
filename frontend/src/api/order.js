import { POST, GET } from './request';

/**
 * Hämta lista med alla ordrar
 * @param {String} token 
 */
let getListOfAllOrders = async (token) => {
    let response = await GET('orders', token)
    if(!response.ok){
        return {message:"Error"}
    }
    let json = await response.json()
    return json
}

/**
 * Skapa ny order
 * @param {Object} order 
 */
let submitNewOrder = async (order, token) => {
    let response = await POST('orders', order, token)
    if(!response.ok){
        return {message:"Error"}
    }
    let json = await response.json()
    return json
}

export default { getListOfAllOrders, submitNewOrder }
export { getListOfAllOrders, submitNewOrder }