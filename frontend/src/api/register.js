let registerNewUser = async (payload) => {
    let response = await fetch('http://localhost:5000/api/register/',{
        method:'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type':'application/json'
        }
    })
 
    let json = await response.json()
 
    return json;
}

export default { registerNewUser }
export { registerNewUser }