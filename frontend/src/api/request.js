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
    return fetch(url(path), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
}

/**
 * GET-request to localhost:5000/api/:path
 * @param {String} path 
 * @param {String} token 
 */
export const GET = function (path,token) {
    //console.log(`%cGET-REQUST TO ${url(path)}`,`color:darkgreen;font-size:25px;`, { token })
    return fetch(url(path), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`, 
        }
    })
}