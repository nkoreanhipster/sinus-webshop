let tryLoginAttempt = async function (payload) {
    let response = await fetch('http://localhost:5000/api/auth/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let json = await response.json()
    return json;
}

export default { tryLoginAttempt }
export { tryLoginAttempt }