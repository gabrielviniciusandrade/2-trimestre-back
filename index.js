//npm init 
//npm i express 
//cliente rapidAPI

const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

app.get("/ola", (req, res)=>{
    res.json("Olá mundo!")
})

    app.get("/perfil", (req, res)=>{
        res.json({ nome: "gabriel", idade: "16 anos"
    })
})

app.listen(port, ()=>{
    console.log("API executando na porta "+ port)


})
