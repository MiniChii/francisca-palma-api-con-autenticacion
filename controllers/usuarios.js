const {
    agregarUsuario: modelAgregarUsuario,
    listarUsuarios: modelListar,
    actualizarUsuario: modelActualizarUsuario,
    borrarUsuario: modelBorrarUsuario,
    verUsuario: modelVerUsuario
  } = require("../models/usuarios");
  
  
  const jwt = require('jsonwebtoken');
  function generarToken() {
      const token =  jwt.sign({nombre:this.nombre}, {secret: process.env.SECRETO})
      return token;
  }
  

  function agregarUsuario(user) {
    //lamar a la capa modelo
    return modelAgregarUsuario(user).then(resultado => {
      return {
        status: 200,
        body: { message: resultado }
      };
    });
  }
  
  function listarUsuarios() {
    return modelListar().then(resultado => {
      return { status: 200, body: resultado };
    });
  }

  //ver usuario
  function verUsuario(nombreUsuario) {
    //ver que exista el usuario
    return existe({ nombre: nombreUsuario }).then(valor => {
      if (valor) {
        return modelVerUsuario(nombreUsuario).then(resultado => {
          return { status: 200, body: { message: resultado } };
        });
      } else {
        return { status: 404, body: { message: "Usuario no encontrado" } };
      }
    });
  }
  
  function actualizarUsuario(nombreUsuario, password) {
    //ver que exista el usuario
    return existe({ nombre: nombreUsuario }).then(valor => {
      if (valor) {
        return modelActualizarUsuario({nombreUsuario, password}).then(resultado => {
          return { status: 200, body: { message: resultado } };
        });
      } else {
        return { status: 404, body: { message: "Usuario no encontrado" } };
      }
    });
  }
  
  function borrarUsuario(nombreUsuario) {
    //ver que exista el usuario... seguir con estoo
    return existe({ nombre: nombreUsuario }).then(valor => {
      if (valor) {
        return modelBorrarUsuario(nombreUsuario).then(resultado => {
          return { status: 200, body: { message: resultado } };
        });
      } else {
        return { status: 404, body: { message: "Usuario no encontrado" } };
      }
    });
  }
  function existe(thisArg) {
    return modelListar().then(lista => lista.some(buscarNombre, thisArg));
  }
  
  function buscarNombre(element, index, list) {
    return element.nombre == this.nombre;
  }
  
  module.exports = {
    agregarUsuario,
    listarUsuarios,
    verUsuario,
    actualizarUsuario,
    borrarUsuario,
    generarToken
  };
  