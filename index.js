const express = require('express')
const app =express()
app.use(express.json())
const cors = require('cors');
app.use(cors());
const {connectDB} = require('./config/connectdb');

require('dotenv').config({path:'./config/.env'})
connectDB()

const PORT= process.env.PORT || 3000
const productRoutes = require('./routes/productRoutes')
// const orderRoutes = require('./routes/orderRoutes')
// const userRouter = require('./routes/userRouter')



// app.get('/', (req, res) => {
//     res.send('API is running.........')
//   });

const morgan=require('morgan');
console.log("go")
const userRoute = require('./routes/User');
app.use(morgan("dev"))
// const importdata = require('./DataImport')
// const notFound =require('./Middleware/Error')
// const errorHandler = require('./Middleware/Error')
// const postRoute=require('./routes/Posts')



// app.use('/api/import',importdata)
// app.use('/api/users',userRouter)
app.use('/api/products',productRoutes)
app.use('api/users',userRoute)
// app.use('/api/orderRoutes',orderRoutes)
// app.use('/api/post',postRoute)
// //ERROR HANDELR
// app.use(notFound)
// app.use(errorHandler)
// app.set('port', (3000));

    const {User} = require("./models/UserModels");
    const {Cooperative} = require("./models/CooperativeModels");
    const {ProductModel} = require("./models/ProductModel");
    const models = { User, Cooperative, ProductModel };
    exports.models = models;





app.listen(3000 ,console.log(`is running in ${PORT}`))
