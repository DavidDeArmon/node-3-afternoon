const swag = require ('../models/swag')

module.exports={
    search:(req,res,next)=>{
        const {category} = req.query
      if(swag.find(e=>e.category==category)===-1){
        return res.status(200).send(swag)
      }else{
          let filtered = swag.filter(e=>{
              e.category ===category;
          })
          res.status(200).send(filtered)
      }
    }
}