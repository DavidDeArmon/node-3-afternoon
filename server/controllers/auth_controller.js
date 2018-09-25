const users = require('../models/users')
var id = 1;
module.exports = {
    login:(req,res,next)=>{
       const {username,password} = req.body;
       if(users.includes({username:username,password:password})){
           req.session.user.username = users.username
           res.status(200).send(req.session.user)
       }else{
           res.sendStatus(500)
       }
    },
    register:(req,res,next)=>{
     const {username,password} = req.body;
     users.push({
         id:id++,
         username:username,
         password:password
     })  
        req.session.user.username=username
     res.status(200).send(req.session.user) 
    },
    signout:(req,res,next)=>{
        req.session.destroy()
        res.status(200).send( req.session)
    },
    getUser:(req,res,next)=>{
        res.status(200).send(req.session.user)
    }
}