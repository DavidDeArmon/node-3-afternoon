const swag = require('../models/swag')

module.exports={
    add:(req,res,next)=>{
        const {id} = req.query
        if(req.session.id==id){
            res.sendStatus(200)
        }else{
            let foundItem = swag.find(e=>e.id==id)
            req.session.user.cart.push(foundItem)
            req.session.user.total+=foundItem.price;
            res.status(200).send(req.session.user)
        }
    },
    delete:(req,res,next)=>{
        const {id} = req.query
        let foundItem = swag.find(e=>e.id==id)
        let index = req.session.user.cart.findIndex(e=>e.id==id)
        console.log(id)
        console.log(index)
        req.session.user.total-=foundItem.price
        req.session.user.cart.splice(index,1)
        res.status(200).send(req.session.user)
    },
    checkout:(req,res,next)=>{
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}