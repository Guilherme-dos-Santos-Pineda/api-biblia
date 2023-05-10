const PORT = 3000
const express = require('express')
const path = require("path")

const app = express()

// app.use('/api', apiRoute);
// app.use(express.static(path.join(__dirname, "public")))

app.use("/index", express.static(path.join(__dirname, "./")))

app.post("/", (req, res)=>{
    res.send("<h1>Hello World From POSTs</h1>")
})

app.listen(PORT, ()=>{
    console.log("Server Rodando na Porta", PORT)
})
 
