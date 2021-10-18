const express = require('express')
const app = express()
const notesRoute = require('./routes/notesRoute')
const port = 5000;

app.use(express.json())
app.use('/notes', notesRoute)

app.get('/', (req, res) => {
  res.send("Hello it's RadencyTask-3")
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})