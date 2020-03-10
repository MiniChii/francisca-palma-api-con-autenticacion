var express = require("express");
var router = express.Router();
var auth = require('../middlewares/middleware')
//endpoints : tipos de url

const {
    agregarUsuario,
    listarUsuarios,
    actualizarUsuario,
    borrarUsuario,
    verUsuario,
    generarToken
} = require("../controllers/usuarios");

router.post("/", function (req, res) {
    agregarUsuario(req.body).then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});


router.get("/", function (req, res) {
    listarUsuarios().then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});

router.get("/:color", function (req, res) {
    verUsuario(req.params.color).then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});


router.put("/:nombre", function (req, res) {
    actualizarUsuario(req.params.nombre, req.body).then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});


router.delete("/:color", function (req, res) {
    borrarUsuario(req.params.color, req.body).then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});

module.exports = router;
