//npm init
//npm i express
//rapidAPI Client

const express = require ("express")
const app = express
const port = 3000 

app.get("/ola", (req, res)=>{
    res.send("olá mundo")
})

applisten (port, ()=>{
    console.log("API executando na porta" + port)
})