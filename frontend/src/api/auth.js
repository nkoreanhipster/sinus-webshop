import { POST, GET } from './request';

/**
 * Login attempt with supplied info
 * @param {Object} payload
 * @return {Object} json 
 */
let tryLoginAttempt = async function (payload) {
    let loginResponse = await POST('auth', payload)
    let json = await loginResponse.json()
    return json;
}

export default { tryLoginAttempt }
export { tryLoginAttempt }