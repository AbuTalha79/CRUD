const express = require("express")
const app = express()
require("dotenv").config()

// connection DB

const connectDB = require('./Service/database')

app.use(express.json())

//router functionality

const userRouter = require('./Controllers/user')
const authRouter = require('./Controllers/Auth')


app.use(userRouter)
app.use(authRouter)

app.get('/', (req,res)=>{
    res.send("<h2>Work in Progress<h2/>")
})

const port = process.env.PORT

const start = async()=>{
    try {
        await connectDB()
      await  app.listen(port,()=>{
            console.log(`Server is listening on : ${port}`);
        })
    } catch (error) {
        console.log("oops! server error");
    }
}

start()





