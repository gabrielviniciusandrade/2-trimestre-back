//npm init 
//npm i express 
//cliente rapidAPI




//​http://localhost:3000/clientes                                   procura todos os clientes
//​http://localhost:3000/perfil                                     procura o prfil
//​http://localhost:3000/clientes/nome/zé                           procura pelo nome
//​http://localhost:3000/clientes/cpf/111.111.111.11                procura pelo cpf
//http://localhost:3000/clientes/222.222.222.22                     deletar cliente



const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')
const { findPackageJSON } = require("module")

app.post("/clientes", (req, res) =>{
   const cliente=req.body
   //abrir arquivo
   try{
   const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
   //adicionar o cliente
   bd.push(cliente)
   //salvar o arquivo
   fs.writeFileSync("bd.json", JSON.stringify(bd), "utf8")
   //resposta
   res.status(201).json({resposta: "cliente cadastrado!!!!!!!!!!!!!!"})
   }catch (erro){
   res.status(500).json({erro: erro.message})
   }
})


app.get("/ola", (req, res)=>{
    res.json("Olá mundo!")
})


    app.get("/perfil", (req, res)=>{
        res.json({ nome: "gabriel", idade: "16 anos"
    })
})

app.get("/clientes", (req, res)=>{
    try {
        //abrir arquivo
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        res.status(200).json({resposta: bd})
    }catch (erro){
        res.status(500).json({erro: erro.message})
    }
})



app.get("/clientes/cpf/:cpf", (req, res)=>{
        const cpf =req.params.cpf
        try {
            const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
            const cliente = bd.find((cliente) => cliente.cpf==cpf)
            if(!cliente) {
                return res.status(404).json({erro:"cliente não existe no BD, digite novamente!!!"})
            }
        

            res.status(200).json({resposta: cliente})
        }catch (erro){
            res.status(500).json({erro: erro.message})
        }
    })
    

app.get("/clientes/nome/:nome", (req, res)=>{
        const nome =req.params.nome
        try {
            const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
            const cliente = bd.find((cliente) => cliente.nome==nome)
            if(!cliente) {
                return res.status(404).json({erro:"cliente não existe no BD, digite novamente!!!"})
            }


            res.status(200).json({resposta: cliente})
        }catch (erro){
            res.status(500).json({erro: erro.message})
        }
    })
    

    app.get("/clientes/senha/:senha", (req, res)=>{
        const senha =req.params.senha
        try {
            const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
            const cliente = bd.find((cliente) => cliente.senha==senha)
            if(!cliente) {
                
                return res.status(404).json({erro:"cliente não existe no BD, digite novamente!!!"})
            }
        

            res.status(200).json({resposta: cliente})
        }catch (erro){
            res.status(500).json({erro: erro.message})
        }
    })


app.delete("/clientes/:cpf", (req, res) => {
     //pegar cpf da rota
    const cpf = req.params.cpf
    try{
          //abrir o arquivo
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
         //encontra o indice do cliente a ser excluido
        const indiceCliente = bd.findIndex((clientes) => clientes.cpf == cpf)
        if (indiceCliente == -1){
            return res.status(404).json
        }

        bd.splice(indiceCliente,1)
        fs.writeFileSync("bd.json",JSON.stringify(bd),"utf8")
        res.status(200).json({resposta: "cliente excluido com sucesso"})
    } catch (erro){
        res.status(500).json({erro: erro.message})
    }
}) 


app.listen(port, ()=>{
        console.log("API executando na porta "+ port)
})