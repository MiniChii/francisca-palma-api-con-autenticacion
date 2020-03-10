
var jwt = require('jsonwebtoken');
const model = require('../models/colores');

isLoggedIn = function (req, res, next) {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            /*
             * Try to decode & verify the JWT token
             * The token contains user's id ( it can contain more informations )
             * and this is saved in req.user object
             */

            req.user = jwt.verify(req.headers['authorization'], process.env.SECRET);

        } catch (err) {
            /*
             * If the authorization header is corrupted, it throws exception
             * So return 401 status code with JSON error message
             */
            return res.status(401).json({
                error: {
                    msg: 'Failed to authenticate token!'
                }
            });
        }
    } else {
        /*
         * If there is no autorization header, return 401 status code with JSON
         * error message
         */
        return res.status(401).json({
            error: {
                msg: 'No token!'
            }
        });
    }
    next();
    return;
}

anonimoOSuColor = function (req, res, next) {

    model.verColor(req.params.color).then((resp) => {
        var color = resp
        if (!color) { //no existe el color
            return res.status(401).json({
                error: {
                    msg: 'El color no existe!'
                }
            });
        } else if (!color.creadoPor) {       //si no tiene creador     
            next();
            return;
        } else { //si tiene creador 
            if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
                try {
                    /*
                     * Try to decode & verify the JWT token
                     * The token contains user's id ( it can contain more informations )
                     * and this is saved in req.user object
                     */

                    req.user = jwt.verify(req.headers['authorization'], process.env.SECRET);

                    if (color.creadoPor === req.user.nombre) {
                        
                        next();
                        return
                    }else{ //debe ser el mismo creador quien modifica
                        return res.status(400).json({
                            error: {
                                msg: 'El creador debe editar o borrar sus colores !'
                            }
                        });
                    }


                } catch (err) {

                    return res.status(401).json({
                        error: {
                            msg: 'Token invalido!'
                        }
                    });

                }
            } 
            
        }
    })




}

module.exports = {
    isLoggedIn,
    anonimoOSuColor

}