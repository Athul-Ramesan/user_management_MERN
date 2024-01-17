require('./config/db')
require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/uploads',express.static(path.join(__dirname,'public','uploads')))

app.use('/',userRouter)
app.use('/admin',adminRouter)

// app.get('/',(req,res)=>{
// res.send({message:'hi'})
// })

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
   console.log( `server is connected to port ${PORT}`);
})