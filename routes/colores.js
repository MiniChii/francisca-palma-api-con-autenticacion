var express = require("express");
var router = express.Router();
var aut= require('../middlewares/middleware')

//endpoints : tipos de url

const {
  agregarColor,
  obtenerLista,
  borrarColores,
  actualizarColor,
  borrarUnColor,
  verColor
} = require("../controllers/colores");

const jwt = require('express-jwt')

const secret  = { secret: process.env.SECRET }


/*
app.get('/protected',
  jwt(secret),
  function (req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });
*/

router.get("/",function (req, res) {
  obtenerLista().then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});

router.get("/:color", function (req, res) {
  verColor(req.params.color).then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});

router.post("/", function (req, res) {
  agregarColor(req.body).then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});



// de acá hacia abajo se necesita autenticación 

//si el creador del color es anonimo, cualquier usuario autenticado puede borrar o modificar
//si el creador no es anonimo, solo él puede modificar o borrar su color

/*
router.delete("/", function (req, res) {
  borrarColores().then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});
*/
router.put("/:color",aut.anonimoOSuColor, function (req, res) {

  actualizarColor(req.params.color, req.body).then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});

router.delete("/:color",aut.anonimoOSuColor, function (req, res) {
  borrarUnColor(req.params.color, req.body).then(resultado => {
    res.status(resultado.status);
    res.json(resultado.body);
  });
});

module.exports = router;
