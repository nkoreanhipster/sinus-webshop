const Order = require('../models/Order')

module.exports = {
    getOrder: async (req,res) => {
        let orders;
        if(req.user.role == 'admin'){
            orders = await Order.all()
        }else{
            orders = await Order.findByCustomer(req.user._id)
        }
        console.log('user',orders)
        res.json(orders)
    },

    createOrder: async (req,res) => {
        let result = await Order.create(req.body, req.user)
        console.log({body:req.body,user:req.user})
        if(result.error){
            res.status(400).json({error: "Could not create order"})
        }else{
            res.json({message: "Order created"})
        }
    }
}