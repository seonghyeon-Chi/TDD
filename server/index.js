const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = 8080;
const app = express();
app.use(express.json);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PW}@cluster0.te4bugy.mongodb.net/?retryWrites=true&w=majority`,
  {
    // 경고 문구 방지
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("Mongo DB Connected"))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hellow World')
})
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`this server listening on ${PORT}`)
})