const express = require("express")
const fs = require("fs")
const app = express()
const { getDatabaseInstance } = require("./database")

app.use(express.static(__dirname + '/public'))

app.use("/create", async (req, res) => {
  const { title, source, description, thumb } = req.query
  const db = await getDatabaseInstance()
  const result = await db.run(`
    INSERT INTO movies(title, source, description, thumb) VALUES(?, ?, ?, ?)`,
    [title, source, description, thumb]
  )
  res.send(result)
})

app.use("/read", async (req, res) => {
  const { id } = req.query
  const db = await getDatabaseInstance()
  const result = await db.get(`
    SELECT * FROM movies WHERE id=?`, 
    [id]
  )
  res.send(result)
})

app.use("/update", async (req, res) => {
  const { id, title, source, description, thumb } = req.query
  const db = await getDatabaseInstance()
  const result = await db.run(`
    UPDATE movies SET title=?, source=?, description=?, thumb=? WHERE id=?`, 
    [title, source, description, thumb, id]
  )
  res.send(result)
})

app.use("/delete", async (req, res) => {
  const { id } = req.query
  const db = await getDatabaseInstance()
  const result = await db.run(`
    DELETE FROM movies WHERE id=?`, 
    [id]
  )
  res.send(result)
})

app.listen(3000, () => console.log("servidor rodando!"))