const User = require.main.require('./models/User')

module.exports = {
    getUsers: async (req,res) => {

        let result = await User.getAll()

        if(result.error){
            res.status(403).json({
                error: result.message
            })
        }else{
            res.json(result)
        }
    },
}