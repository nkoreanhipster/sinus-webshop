import { POST } from './request';
let registerNewUser = async (payload) => {
    let response = await POST('http://localhost:5000/api/register/')
    let json = await response.json()
    return json;
}

export default { registerNewUser }
export { registerNewUser }