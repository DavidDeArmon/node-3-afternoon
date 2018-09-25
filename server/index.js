require('dotenv').config()
const express = require ('express')
const {json} = require ('body-parser')
const session = require('express-session')
const port = process.env.SERVER_PORT || 3001;

//middleware
const checkForSession = require('./middlewares/checkForSession')
//controllers
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express()


app.use(json())

app.use(session({
    secret:'heyo',
    resave:false,
    saveUninitialized:true

}))

app.use(checkForSession)
app.use( express.static( `${__dirname}/build` ) );


app.get('/api/swag',swag_controller.read)
app.get('/api/user',auth_controller.getUser)
app.post('/api/login',auth_controller.login)
app.post('/api/register',auth_controller.register)
app.post('/api/signout',auth_controller.signout)

app.post('/api/cart',cart_controller.add)
app.delete('/api/cart',cart_controller.delete)
app.post('/api/cart/checkout',cart_controller.checkout)

app.get('/api/search',search_controller.search)




app.listen(port,()=>console.log('server is running on port:',port))