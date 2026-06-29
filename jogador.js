
/*GET http://localhost:3000/jogadores*/                                  /*Buscar todos os jogadores*/
/*GET http://localhost:3000/jogadores/cpf/12345678900*/                  /*Buscar por CPF*/
/*GET http://localhost:3000/jogadores/nome/Vinicius Junior*/             /*Buscar por Nome*/
/*Cadastrar novo jogador (POST)*/
/*DELETE http://localhost:3000/jogadores/12345678900*/                   /*Deletar jogador*/

/*Buscar Atacantes, goleiro, meio-campo */
/*GET http://localhost:3000/jogadores/posicao/Atacante*/
/*GET http://localhost:3000/jogadores/posicao/Goleiro*/
/*GET http://localhost:3000/jogadores/posicao/Meio-Campo*/


const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const fs = require('fs');

// ===================== ROTAS =====================

app.post("/jogadores", (req, res) => {
   const jogador = req.body;
   
   try {
      const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));
      
      bd.push(jogador);
      
      fs.writeFileSync("bd.json", JSON.stringify(bd, null, 2), "utf8");
      
      res.status(201).json({ 
         resposta: "Jogador convocado para a Seleção Brasileira com sucesso! 🇧🇷" 
      });
   } catch (erro) {
      res.status(500).json({ erro: erro.message });
   }
});

app.get("/ola", (req, res) => {
    res.json("Olá, torcida brasileira! 🇧🇷");
});

app.get("/perfil", (req, res) => {
    res.json({ 
        nome: "Gabriel", 
        idade: "16 anos",
        selecao: "Seleção Brasileira"
    });
});

app.get("/jogadores", (req, res) => {
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));
        res.status(200).json({ resposta: bd });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

/*BUSCAR ṔOR CPF*/


app.get("/jogadores/cpf/:cpf", (req, res) => {
    const cpf = req.params.cpf;
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));
        const jogador = bd.find((j) => j.cpf == cpf);

        if (!jogador) {
            return res.status(404).json({ 
                erro: "Jogador não encontrado na Seleção Brasileira!" 
            });
        }

        res.status(200).json({ resposta: jogador });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

/*BUSCAR POR NOME*/


app.get("/jogadores/nome/:nome", (req, res) => {
    const nome = req.params.nome;
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));                       /*que serve para ler arquivos,   (readFileSync)*/
        const jogador = bd.find((j) => j.nome == nome);

        if (!jogador) {
            return res.status(404).json({ 
                erro: "Jogador não encontrado na Seleção Brasileira!" 
            });
        }

        res.status(200).json({ resposta: jogador });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

/*BUSCAR POR POSIÇAO*/


app.get("/jogadores/posicao/:posicao", (req, res) => {
    const posicao = req.params.posicao;
    
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));
        
       
        const jogadores = bd.filter((j) => 
            j.posicao.toLowerCase() === posicao.toLowerCase()                        /*converte todo o texto para letras minúsculas, (toLowerCase)*/
        );

        if (jogadores.length === 0) {
            return res.status(404).json({ 
                erro: `Nenhum jogador encontrado na posição: ${posicao}` 
            });
        }

        res.status(200).json({ 
            quantidade: jogadores.length,
            resposta: jogadores 
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

/*DELETAR JOGADOR*/


app.delete("/jogadores/:cpf", (req, res) => {
    const cpf = req.params.cpf;
    
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"));
        
        const indiceJogador = bd.findIndex((jogador) => jogador.cpf == cpf);
        
        if (indiceJogador === -1) {
            return res.status(404).json({ 
                erro: "Jogador não encontrado para exclusão!" 
            });
        }

        bd.splice(indiceJogador, 1);
        fs.writeFileSync("bd.json", JSON.stringify(bd, null, 2), "utf8");
        
        res.status(200).json({ 
            resposta: "Jogador removido da Seleção Brasileira com sucesso" 
        });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 API da Seleção Brasileira executando na porta ${port}`);
});