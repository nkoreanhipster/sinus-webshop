const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const NeDB = require('nedb-promise')
const user_db = new NeDB({filename:'database/users.db', autoload:true})


let secret1 = 'supersecret'
let secret2 = 'secret'

const TEST_PASSWORDS = ['password','admin','test','example','','root','secret','supersecret','admin@admin.com','ctf']

const _forLoop = async _=> {

    let users = await user_db.find({})
    for (let user of users) {
        let matches = []
        for(let password of TEST_PASSWORDS){
            const passwordMatch = await bcrypt.compare(password, user.password)
       
            if(passwordMatch){
                matches.push(password)
            }
            break;
        }  
        console.log({ email:user.email, foundPassword: matches.length > 0 ? matches.shift() : false })
    }
}

_forLoop()