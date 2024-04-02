const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const productRoute = require("./routes/productsRoutes.js")
const app = express();

const port = process.env.port || 3000;
const corsOptions = {
  origin: "*",
  credentails: true,
  optionSuccessStatus: 200,
  port: port,
}

app.use(express.json());
app.use(express.static(__dirname + "/public/"))
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))

app.use("/api/products", productRoute)


app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

mongoose.connect("mongodb+srv://Lavish:lavish098@express-api.mf1prrw.mongodb.net/?retryWrites=true&w=majority&appName=Express-api")
.then(() => {
  console.log('Connected to database')
  app.listen(port, console.log(`Express is listening on ${port}`));
})
.catch(() => {
  console.log('Connection failed')
})