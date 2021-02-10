/**
 * Getta en lista med alla products
 */
let getProducts = async () => {
    let response = await fetch('http://localhost:5000/api/products/', {
        headers: {
            'Accept': 'application/json'
        }
    })

    let json = await response.json()
    return json
}

/**
 * Få en(1) produkt
 * @param {Number} id 
 */
let getProduct = async (id) => {
    let response = await fetch(`http://localhost:5000/api/products/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    })

    let json = await response.json()
    return json
}

/**
 * Skapa ny produkt
 * @param {Object} product 
 */
let newProduct = async (product) => {
    let response = await fetch('http://localhost:5000/api/products/', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    let json = await response.json()
    return json
}

let patchProduct = async (product) => {

    let { _id } = product

    let response = await fetch(`http://localhost:5000/api/products/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    return json
}


/**
 * 
 * @param {Number} id
 */
let deleteProduct = async (id) => {
    let response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    let json = await response.json()
    return json
}

export default { getProducts, getProduct, deleteProduct, newProduct, patchProduct }
export { getProducts, getProduct, deleteProduct, newProduct, patchProduct }