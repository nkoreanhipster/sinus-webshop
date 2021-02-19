// Root endpoint-url
const endpointBaseUrl = 'http://localhost:5000/api/'
// Most commonly used request header
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

/**
 * Generate full url with included path
 * @param {String} path 
 */
let url = (path = '') => new URL(path, endpointBaseUrl).href

/**
 * Overwritable header-object
 * @param {Object} additionalHeaderItems 
 */
let generateHeader = (additionalHeaderItems) => {
    return { ...defaultHeaders, ...additionalHeaderItems }
}

/**
 * POST-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {Object} payload 
 * @param {String} token 
 */
export const POST = function (path, payload, token) {
    let headers = generateHeader()

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
    let headers = generateHeader()

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return fetch(url(path), {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers
    })
}