const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookies = require('cookie-parser')
const productRoute = require("./routes/productsRoutes.js")
const authRoute = require("./routes/authRoutes.js");
const { requireAuth } = require("./middleware/authMiddleware.js");
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
app.use(cookies())

app.use("/api/products", requireAuth, productRoute)
app.use(authRoute)


app.get('/add-product', requireAuth, (req, res) => {
  res.sendFile('addProducts.html', {root: path.join(__dirname, 'public')});
});
app.get('/login', (req, res) => {
  res.sendFile('login.html', {root: path.join(__dirname, 'public')});
});



mongoose.connect("mongodb+srv://Lavish:lavish098@express-api.mf1prrw.mongodb.net/?retryWrites=true&w=majority&appName=Express-api")
.then(() => {
  console.log('Connected to database')
  app.listen(port, console.log(`Express is listening on ${port}`));
})
.catch(() => {
  console.log('Connection failed')
})