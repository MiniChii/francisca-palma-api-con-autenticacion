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

router.post('/login', function(req, res) {
    /*
     * Check if the username and password is correct
     */
    let user={};
    verUsuario(req.body.username).then((resp)=>{
        user =resp.body.message
        if( req.body.username === user.nombre && req.body.password === user.password ) {
            res.json({
                id: 1,
                username: user.nombre,
                jwt: generarToken()
            });
        } else {
            /*
             * If the username or password was wrong, return 401 ( Unauthorized )
             * status code and JSON error message
             */
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }

    })
    
  
    
});


router.get("/", function (req, res) {
    listarUsuarios().then(resultado => {
        res.status(resultado.status);
        res.json(resultado.body);
    });
});

router.get("/:user", function (req, res) {
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
