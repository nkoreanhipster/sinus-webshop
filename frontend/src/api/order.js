/**
 * Hämta lista med alla ordrar
 */
let getListOfAllOrders = async() => {
    let response = await fetch('http://localhost:5000/api/orders', {
        headers: {
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    return json
}

/**
 * Skapa ny order
 * @param {Object} order 
 */
let submitNewOrder = async(order) => {
    let response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    return json
}

export default { getListOfAllOrders, submitNewOrder }
export { getListOfAllOrders, submitNewOrder }