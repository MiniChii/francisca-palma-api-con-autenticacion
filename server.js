// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

const http = require('http');
const express = require('express');
const app = express();
const bodyParse = require('body-parser')
const coloresRouter = require('./routes/colores')
const usuariosRouter = require('./routes/usuarios')

//transforma a JSON
app.use(bodyParse.json());
app.use('/colores', coloresRouter);
app.use('/usuarios', usuariosRouter);

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
});
app.get("/ups", (request, response) => {
    response.sendFile(__dirname + "/views/ups.html");
});
/*
app.get('/usuarios', jwt(secret),(req, res) => {
  //validando que el usuario sea admin

  
  if(req.user.chii){
    return res.status(200).send(users)
  }
  //respuesta para el usuario que no es admin
  res.status(401).send({ message: 'not authorized' })
})*/

app.listen(process.env.PUERTO, () => {
    console.log('Escuchando en el puerto: ' + process.env.PUERTO);
})

