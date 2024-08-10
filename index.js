const express=require('express')
const { PORT } = require('./config/serverConfig.js')
const connectDb = require('./config/dbConfig.js')
const userRouter=require('./routes/userRoutes.js')
const serverconfig = require('./config/serverConfig.js')
const cookieParser=require('cookie-parser')
// const isLoggedIN=require('./validation/authvalidator.js')
const authrouter = require('./routes/authRoutes.js')
const isLoggedIn = require('./validation/authValidator.js')
const productRouter = require('./routes/productRoutes.js')
const cartRoute = require('./routes/cartRoutes.js')
const orderRoute = require('./routes/orderRoutes.js')
const cors=require('cors')
const session = require('express-session')
const MongoStore= require('connect-mongo')
// const serverConfig = require('./config/serverConfig.js')
const app= express()

// const corsOptions = {
//     origin: serverconfig.FRONTEND_URL, // Specify your client's origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//     credentials: true, // Enable credentials
//   };

// app.use(cors({
//   origin: serverConfig.FRONTEND_URL, // allow to server to accept request from different origin
//   credentials: true, // allow session cookie from browser to pass through
// }));
  
  // app.use(cors(corsOptions));

  const corsOptions = {
    origin: 'https://pie-charter-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));


app.use(session({
  secret: serverconfig.JWT_SECRET,
  resave: false, // Don't save session if unmodified
  saveUninitialized: false, // Don't create session until something stored
  store: MongoStore.create({
      mongoUrl: serverconfig.DB_URL, // Your MongoDB connection string
      collectionName: 'sessions' // Optional collection name (default is 'sessions')
  }),
  // cookie: {
  //     maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  //     secure: false, // Set to true if using HTTPS
  //     sameSite: 'lax'
  // }
}));

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