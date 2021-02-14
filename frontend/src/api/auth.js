import { POST, GET } from './request';

let tryLoginAttempt = async function (payload) {
    let loginResponse = await POST('auth', payload)
    let json = await loginResponse.json()
    return json;
}

export default { tryLoginAttempt }
export { tryLoginAttempt }