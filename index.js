const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT||5000
 const toolsrouter= require("./Routes/v1/tools.routes.js")
const errorHandler = require("./middleware/errorHandler")
const { connectToServer } = require('./utils/dbConected');
require("dotenv").config();
app.use(cors())
app.use(express.json())

connectToServer((err)=>{
    if(!err){
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    }
    else{
     console.log(err)
    }
}
  
)

app.use("/api/v1/tools",toolsrouter)
  


app.all("*",(req,res)=>{
    res.send('NO Route found')
  })

app.use(errorHandler);
 
process.on("unhandledRejection",(error)=>{
    console.log('error.name,error.message');
    app.close(()=>{
       process.exit(1)
    })
})










app.get('/', (req, res) => {
  res.send('Hello World!')
})

