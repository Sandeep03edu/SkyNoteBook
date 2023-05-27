const connectToMongo = require("./db");
const express = require('express')
const port = 5000

// Run the function 
connectToMongo();

const app = express()

// It is used to send Json Body request
// We have to set "content-type" : "applicatiom/json" in headers to send Json body req to api

app.use(express.json())


// Fixing Cors
var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})