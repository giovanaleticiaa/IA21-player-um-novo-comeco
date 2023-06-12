const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", (req, res) => {
  const { file, text } = req.query
  fs.writeFileSync(file, text)
  res.send("Arquivo Criado!")
})

app.use("/read", (req, res) => {
  const { file } = req.query
  const texto = fs.readFileSync(file)
  res.send(texto.toString())
})

app.use("/update", (req, res) => {
  const { file, text } = req.query
  fs.appendFileSync(file, text)
  res.send("Arquivo Atualizado!")
})

app.use("/delete", (req, res) => {
  const { file } = req.query
  fs.rmSync(file)
  res.send("Arquivo Deletado!")
})

app.listen(3000, () => console.log("Servidor funcionando!"))