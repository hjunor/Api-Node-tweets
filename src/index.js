require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.SENHA}@goweek-nxmj1.mongodb.net/test?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then( res =>
  console.log("conectado ao banco de dados com exito")
  )

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3000, () =>{
    console.log('servidor startado');
}); 