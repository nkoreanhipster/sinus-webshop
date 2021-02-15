const endpointBaseUrl = 'http://localhost:5000/api/'
let url = (path = '') => new URL(path, endpointBaseUrl).href

/**
 * POST-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {Object} payload 
 * @param {String} token 
 */
export const POST = function (path, payload, token) {
    //console.log(`%cPOSTING REQUST TO ${url(path)}`,`color:darkgreen;font-size:25px;`, { payload, token })

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(url(path), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers
    })
}

/**
 * GET-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {String} token 
 */
export const GET = function (path, token) {
    return fetch(url(path), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

/**
 * DELETE-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {String} token 
 */
export const DELETE = function (path, token) {
    return fetch(url(path), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

/**
 * PATCH-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {Object} payload 
 * @param {String} token 
 */
export const PATCH = function (path, payload, token) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(url(path), {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers
    })
}