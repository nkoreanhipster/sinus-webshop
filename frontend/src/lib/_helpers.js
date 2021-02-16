import jwt from 'jsonwebtoken'
const key = '_'

/**
 * Retrieve token from localstorage
 * @return {String} token
 */
export const getToken = () => {
    let _ = JSON.parse(localStorage.getItem(key))
    if (!_ || !_.tokenStr) return false;
    let { token } = _
    return token
}

/**
 * Save token to storage
 * @param {String} tokenStr 
 */
export const storeToken = (token) => localStorage.setItem(key, JSON.stringify({ token }))


/**
 * Clear storage
 */
export const clearToken = () => {
    localStorage.clear()
}