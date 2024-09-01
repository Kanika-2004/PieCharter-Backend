const express=require('express')
const { PORT } = require('./config/serverConfig.js')
const connectDb = require('./config/dbConfig.js')
const userRouter=require('./routes/userRoutes.js')

const cookieParser=require('cookie-parser')
// const isLoggedIN=require('./validation/authvalidator.js')
const authrouter = require('./routes/authRoutes.js')
const isLoggedIn = require('./validation/authValidator.js')
const productRouter = require('./routes/productRoutes.js')
const cartRoute = require('./routes/cartRoutes.js')
const orderRoute = require('./routes/orderRoutes.js')
const cors=require('cors')
const serverconfig= require('./config/serverConfig.js')

const app= express()

// app.use(cors({
//   origin: serverconfig.FRONTEND_URL,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true // This is important if you're dealing with cookies or sessions
// }));

// app.use(cors({
//   origin: serverConfig.FRONTEND_URL, // allow to server to accept request from different origin
//   credentials: true, // allow session cookie from browser to pass through
// }));
  
  // app.use(cors(corsOptions));
// 'http://localhost:5173'
  const corsOptions = {
    origin: serverconfig.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    // optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/ping',isLoggedIn,async(req,res)=>{
     console.log(req.cookies)
    return res.json({message:"pong"})
})
app.use('/auth',authrouter)
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/carts',cartRoute)
app.use('/orders',orderRoute)
app.listen(serverconfig.PORT,async ()=>{
    await connectDb()
    console.log(`successfully connected to portt ${serverconfig.PORT}`)
});